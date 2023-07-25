export class LLMBase {
  textCompletion(model: string, temperature: number, prompt: string, message: string): Promise<string> {
    return Promise.resolve(`model: ${model}, temperature: ${temperature}, prompt: ${prompt}, message: ${message}`)
  }
}
