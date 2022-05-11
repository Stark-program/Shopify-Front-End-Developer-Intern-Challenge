// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import 'dotenv/config'
import axios from 'axios'


let openAi_secret_key = process.env.OPENAI_SECRET_KEY


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body)
  let config = {
    headers: {Authorization: `Bearer ${openAi_secret_key}`}
  }
  let resp = await axios.post("https://api.openai.com/v1/engines/text-curie-001/completions", req.body, config)
  console.log(resp.data.choices[0].text)
}
