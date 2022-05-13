import type { NextApiRequest, NextApiResponse } from 'next'
import 'dotenv/config'
import axios from 'axios'
const OpenAI = require('openai-api')

// Load your key from an environment variable or secret management service
// (do not include your key directly in your code)
const openAi_secret_key = process.env.OPENAI_SECRET_KEY

const openai = new OpenAI(openAi_secret_key)

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
  console.log(data)
  let config = {
    headers: { Authorization: `Bearer ${openAi_secret_key}` },
  }
  const resp = await axios.post(
    'https://api.openai.com/v1/answers',
    data,
    config
  )
  console.log(resp.data)
  res.send(resp.data)
}
