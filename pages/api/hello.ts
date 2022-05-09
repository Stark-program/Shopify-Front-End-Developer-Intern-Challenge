// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import 'dotenv/config'


let openAi_secret_key = process.env.OPENAI_SECRET_KEY

type Data = {
  name: string
  key: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(openAi_secret_key)
  res.status(200).json({ name: 'John Doe', key: `${openAi_secret_key}` })
}
