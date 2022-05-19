import type { NextApiRequest, NextApiResponse } from 'next'
import 'dotenv/config'

import {axiosDefaultHeader} from './axios/default_header'

const openAi_secret_key = process.env.OPENAI_SECRET_KEY

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let data = {
    documents: req.body.documents,
    question: req.body.question,
    search_model: 'ada',
    model: 'curie',
    examples_context: 'In 2017, U.S. life expectancy was 78.6 years.',
    examples: [
      ['What is human life expectancy in the United States?', '78 years.'],
    ],
    max_tokens: 5,
    stop: ['/n', '<|end of text|>'],
  }

  try {
    const resp = await axiosDefaultHeader.post(
      'https://api.openai.com/v1/answers',
      data,
    )
    let configureRes = {
      endpoint: 'Answer',
      input: data.documents,
      response: resp.data.answers[0],
      prompt: data.question,
    }
    res.send(configureRes)
  } catch (err) {
    console.log(err)
  }
}
