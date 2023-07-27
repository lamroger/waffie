import { Command, Flags } from '@oclif/core'
import 'dotenv/config'
import { LLM } from '../providers/openai/llm'
import { LLMBase } from '../providers/base/llm-base'

export default class TextCompletion extends Command {
  static description = 'describe the command here'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    provider: Flags.string({
      description: 'API Provider to use',
      required: true,
      options: ['openai', 'anthropic'],
    }),
    // flag with no value (-f, --force)
    force: Flags.boolean({ char: 'f' }),
  }

  static args = {}

  providerToClient(provider: string): LLMBase {
    if (provider === 'openai') {
      return new LLM(process.env.OPENAI_API_KEY || '')
    }

    throw new Error('Invalid provider')

    // else if (provider === 'anthropic') {
    //   return new LLM(process.env.ANTHROPIC_API_KEY || '')
    // } else {
    //   throw new Error('Invalid provider')
    // }
  }

  public async run(): Promise<void> {
    const { flags } = await this.parse(TextCompletion)

    const client = this.providerToClient(flags.provider)

    await client.textCompletion('gpt-3.5-turbo', 0, '', 'can you write me a 10 line poem to hype up a internal medicine intern')
  }
}
