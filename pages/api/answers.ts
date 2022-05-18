import type { NextApiRequest, NextApiResponse } from 'next'
import 'dotenv/config'
import axios from 'axios'

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

  let config = {
    headers: { Authorization: `Bearer ${openAi_secret_key}` },
  }

  try {
    const resp = await axios.post(
      'https://api.openai.com/v1/answers',
      data,
      config
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
