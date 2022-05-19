
import type { NextApiRequest, NextApiResponse } from 'next'
import 'dotenv/config'
import { axiosDefaultHeader } from './axios/default_header'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  {
    let value = req.body

    let data = {
      prompt: value.prompt,
      max_tokens: 64,
      top_p: 1.0,
      temperature: 0,
    }
    try {
      const response = await axiosDefaultHeader.post(
        'https://api.openai.com/v1/engines/text-curie-001/completions',
        data,
      )
      let configureRes = {
        endpoint: 'Completion',
        response: response.data.choices[0].text,
        prompt: value.prompt,
      }
      res.send(configureRes)
    } catch (err) {
      console.log(err)
    }
  }
}
