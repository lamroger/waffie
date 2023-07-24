import { Args, Command, Flags } from '@oclif/core'
import { parse as yamlParse } from 'yaml'
import { readFileSync, readdir } from 'node:fs'
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

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(File)

    const file = readFileSync(args.filePath, 'utf8')
    const fileContent = yamlParse(file)

    const actions = fileContent.actions
    for (const action of Object.keys(fileContent.actions)) {
      const name = action
      console.log(actions[name])
      const { command, providers, prompt, test_directory } = actions[name]

      console.log({ providers })
      for (const provider of providers) {
        const client = this.commandToClient(command, provider)

        // Iterate through files in test_directory relative to Waffiefile
        const testDirectoryPath = path.join(process.cwd(), args.filePath, '..', test_directory)

        console.log({ testDirectoryPath })
        readdir(testDirectoryPath, (err, files) => {
          if (err) {
            console.error('Error reading directory:', err)
            return
          }

          // Iterate through the files
          for (const file of files) {
            // Do something with each file in the test_directory
            console.log(file)
          }
        })
      }

      console.log(`Testing ${name}:`)
    }
  }
}
