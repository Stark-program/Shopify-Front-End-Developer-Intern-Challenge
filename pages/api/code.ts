import type { NextApiRequest, NextApiResponse } from 'next'
import 'dotenv/config'
import axios from 'axios'

let openAi_secret_key = process.env.OPENAI_SECRET_KEY

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
      console.log(req.body)
  }