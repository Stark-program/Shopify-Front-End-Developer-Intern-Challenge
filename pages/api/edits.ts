import type { NextApiRequest, NextApiResponse } from 'next'
import 'dotenv/config'
import axios from 'axios'

let openAi_secret_key = process.env.OPENAI_SECRET_KEY

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let data = {
    input: req.body.input,
    instruction: req.body.instruction, 
  }
  let config = {
    headers: { Authorization: `Bearer ${openAi_secret_key}` },
  }
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/text-davinci-edit-001/edits',
      data,
      config
    )
    let configureRes = {
      endpoint: "Edit",
      input: data.input,
      response: response.data.choices[0].text,
      prompt: data.instruction
    }
    res.send(configureRes)
  } catch (err) {
    console.log(err)
  }
}
