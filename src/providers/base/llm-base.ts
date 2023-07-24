export class LLMBase {
  textCompletion(model: string, temperature: number, message: string): Promise<string> {
    return Promise.resolve(`model: ${model}, temperature: ${temperature}, message: ${message}`)
  }
}
