import axios from 'axios'
import 'dotenv/config'

const openAi_secret_key: any = process.env.OPENAI_SECRET_KEY

export const axiosDefaultHeader = axios.create({
    headers: { Authorization: `Bearer ${openAi_secret_key}` }
});