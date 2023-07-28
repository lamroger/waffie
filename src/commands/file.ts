import { Args, Command, Flags } from '@oclif/core'
import { parse as yamlParse } from 'yaml'
import { readFileSync, createReadStream, readdir } from 'node:fs'
import { LLMBase } from '../providers/base/llm-base'
import { LLM } from '../providers/openai/llm'
import { parse as csvParse } from 'csv-parse'
import path = require('node:path')

export default class File extends Command {
  static description = 'Runs automated tests using the provided Waffiefile'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({ char: 'n', description: 'name to print' }),
    // flag with no value (-f, --force)
    force: Flags.boolean({ char: 'f' }),
  }

  static args = {
    filePath: Args.string({ description: 'Path to Waffiefile', required: true }),
  }

  commandToClient = (command: string, provider: string): LLMBase => {
    if (command === 'text-completion' && provider === 'openai') {
      return new LLM(process.env.OPENAI_API_KEY || '')
    }

    throw new Error('Unrecognized command')
  }

  processFile = async (filePath: string, prompt: string, client: LLMBase): Promise<number[]> => {
    // eslint-disable-next-line camelcase
    const readStream = createReadStream(filePath).pipe(csvParse({ delimiter: ',', from_line: 2 }))

    let count = 0
    let passed = 0
    for await (const row of readStream) {
      count += 1

      try {
        const rawResponse = await client.textCompletion('gpt-3.5-turbo', 0, prompt, row[0].toString())

        const response = JSON.parse(rawResponse)
        const processedRow = response.result.trim().toLowerCase()
        const expected = row[1].trim().toLowerCase()
        console.log({ processedRow, expected })
        if (processedRow === expected) passed += 1
      } catch (error) {
        console.error('An error occurred while processing the row:', error)
      }
    }

    return [count, passed]
  }

  testFile = async (filePath: string, client: LLMBase, prompt: string): Promise<boolean> => {
    const [count, passed] = await this.processFile(filePath, prompt, client)

    const results = {
      file: filePath,
      count,
      passed,
      allPassed: count === passed,
    }

    console.log(results)
    return count === passed
  }

  public async run(): Promise<void> {
    const { args } = await this.parse(File)

    const file = readFileSync(args.filePath, 'utf8')
    const fileContent = yamlParse(file)

    const actions = fileContent.actions
    for (const action of Object.keys(fileContent.actions)) {
      const name = action
      const { command, providers, prompt, test_directory: testDirectory } = actions[name]

      for (const provider of providers) {
        const client = this.commandToClient(command, provider)

        // Iterate through files in test_directory relative to Waffiefile
        const testDirectoryPath = path.join(process.cwd(), args.filePath, '..', testDirectory)

        readdir(testDirectoryPath, async (err, files) => {
          if (err) {
            console.error('Error reading directory:', err)
            return
          }

          const resultsPromises = []
          for (const file of files) {
            resultsPromises.push(this.testFile(path.join(testDirectoryPath, file), client, prompt))
          }

          const results = await Promise.all(resultsPromises)
          return results.every(result => result)
        })
      }
    }
  }
}
