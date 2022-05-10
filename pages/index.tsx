import type { NextPage } from 'next'
import axios from 'axios'

/*FOR THIS CHALLENGE THE APP MUST CONTAIN
1. A SIMPLE INPUT FORM
2. SUBMITTING THE FORM SUBMITS THE PROMPT TO THE OPENAI
3. RESULTS ARE DISPLAYED IN A LIST, SORTED FROM NEWEST TO OLDEST. EACH RESULT SHOULD INCLUDE
  THE ORIGINAL PROMPT AND A RESPONSE FROM THE API.
*/
const Home: NextPage = () => {

  async function test(e:any) {
    e.preventDefault()
    let inputValue = e.target[0].value
  let data = {
    prompt: inputValue,
    max_tokens: 64,
    top_p: 1.0,
    temperature: 0
  }
  try {
    const res = await axios.post("/api/handler", data)
    console.log(res)
  } catch (err) {
    console.log(err)
  }
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className='max-w-xl'>
        <h1 className='text-center text-[30px]'>Fun With Roofus!</h1>
        <p className='text-center mx-2'>Below you will find an input field! In this field you are welcome to ask Roofus any questions you desire! Roofus is an AI eginnered bot that is programmed to give you the best response catered to your question. This is done utilizing GPT-3 created by <span className='text-blue-600 underline'><a href="https://openai.com/api/" target="_blank">OpenAI</a></span>!</p>
      </div>
      <form className="flex flex-col mt-10" onSubmit={test}>
        <label className="flex justify-center"htmlFor='userInput'>Ask the bot a question!</label>
        <textarea id="userInput" name="userInput" className="border-2 border-gray-700" rows={20} cols={50}></textarea>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2" type="submit">
          Submit Question!
        </button> 
      </form>
    </div>
  )
}

export default Home
