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
     const resp = await openai.search({
       engine:'davinci',
       documents: ["White House", "Hospital", "School"],
       query:"The President"
     })
     console.log(resp.data)
  }