// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import 'dotenv/config'
import axios from 'axios'



const openAi_secret_key = process.env.OPENAI_SECRET_KEY



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {{
  let value = req.body
  
  let config = {
      headers: {Authorization: `Bearer ${openAi_secret_key}`}
    }
  
    let data = {
      prompt: value.prompt,
      max_tokens: 64,
      top_p: 1.0,
      temperature: 0
    }
  const response = await axios.post("https://api.openai.com/v1/engines/text-curie-001/completions",data,config)
  let configureRes = {
    endpoint: "Completion",
    response: response.data.choices[0].text,
    prompt: value.prompt
  }
  res.send(configureRes)
  };

}

