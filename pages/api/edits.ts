import type { NextApiRequest, NextApiResponse } from 'next'
import 'dotenv/config'
import { axiosDefaultHeader } from './axios/default_header'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let data = {
    input: req.body.input,
    instruction: req.body.instruction, 
  }
 
  try {
    const response = await axiosDefaultHeader.post(
      'https://api.openai.com/v1/engines/text-davinci-edit-001/edits',
      data,
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
