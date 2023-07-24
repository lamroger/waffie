import { Configuration, OpenAIApi } from 'openai'

import { LLMBase } from '../base/llm-base'

export class LLM extends LLMBase {
  client: OpenAIApi

  constructor(apiKey: string) {
    super()
    const configuration = new Configuration({
      apiKey,
    })
    this.client = new OpenAIApi(configuration)
  }

  async textCompletion(model: string, temperature: number, message: string): Promise<string> {
    return new Promise((resolve, _reject) => {
      this.client.createChatCompletion({
        model,
        temperature,
        messages: [{ role: 'user', content: message }],
      }).then(chatCompletion => {
        console.log(chatCompletion.data.choices[0].message)
        resolve(chatCompletion.data.choices[0].message?.content || 'error')
      }).catch(error => {
        // Handle any potential errors that might occur during the Promise execution
        console.error(error)
        resolve('error') // You can choose how to handle the error case
      })
    })
  }
}
