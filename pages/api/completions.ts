// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import 'dotenv/config'
const OpenAI = require('openai-api');

// Load your key from an environment variable or secret management service
// (do not include your key directly in your code)
const openAi_secret_key = process.env.OPENAI_SECRET_KEY

const openai = new OpenAI(openAi_secret_key);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let value = req.body
  console.log(value)
  const response = await openai.complete({
    engine:'davinci',
    prompt: value.prompt,
    temperature: 0.5,
    topP:0.1,
    max_tokens: 64,
    n: 1,
    stop:"after a full sentence"
     
  });
console.log(response.data)
}

