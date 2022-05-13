import type { NextPage } from 'next'
import axios from 'axios'
import { useState } from 'react'

/*FOR THIS CHALLENGE THE APP MUST CONTAIN
1. A SIMPLE INPUT FORM
2. SUBMITTING THE FORM SUBMITS THE PROMPT TO THE OPENAI
3. RESULTS ARE DISPLAYED IN A LIST, SORTED FROM NEWEST TO OLDEST. EACH RESULT SHOULD INCLUDE
  THE ORIGINAL PROMPT AND A RESPONSE FROM THE API.
*/
const Home: NextPage = () => {
  const [isAnswers, setIsAnswers] = useState(false)
  const [isCompletions, setIsCompletions] = useState(false)
  const [isCode, setIsCode] = useState(false)

  async function completions(e: any) {
    e.preventDefault()
    let inputValue = e.target[0].value
    let data = {
      prompt: inputValue,
    }
    try {
      const res = await axios.post('/api/completions', data)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }
  async function search(e: any) {
    e.preventDefault()
    let inputValue = e.target[0].value
    let data = {
      prompt: inputValue,
    }
    try {
      const res = await axios.post('api/search', data)
    } catch (err) {
      console.log(err)
    }
  }
  const RenderQuestionExplenation = () => {
    return (
      <p className="mx-2 text-center">
        In this field you are welcome to ask any questions you desire! This is
        an AI engineered bot that is programmed to give you the best response
        catered to your question. This is done utilizing GPT-3 created by{' '}
        <span className="text-blue-600 underline">
          <a href="https://openai.com/api/" target="_blank">
            OpenAI
          </a>
        </span>
        !
      </p>
    )
  }
  const RenderCompletionExplenation = () => {
    return (
      <p className="mx-2 text-center">
        In this field you are welcome to write any prompt you want and the bot
        will do its best to finish the statement! This is an AI engineered bot
        that is programmed to give you the best response catered to your input.
        This is done utilizing GPT-3 created by{' '}
        <span className="text-blue-600 underline">
          <a href="https://openai.com/api/" target="_blank">
            OpenAI
          </a>
        </span>
        !
      </p>
    )
  }
  const RenderCodeExplenation = () => {
    return (
      <p className="mx-2 text-center">
        In this field you are welcome to ask the AI to create a snippet of code,
        try your best to give the bot as many details as possible to better
        format the code you are looking for. This is an AI engineered bot that
        is programmed to give you the best response catered to your input. This
        is done utilizing GPT-3 created by{' '}
        <span className="text-blue-600 underline">
          <a href="https://openai.com/api/" target="_blank">
            OpenAI
          </a>
        </span>
        !
      </p>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="max-w-xl">
        <h1 className="text-center text-[30px]">Fun With AI!</h1>
        <div>
          {(() => {
            switch (true) {
              case isAnswers:
                return <RenderQuestionExplenation />

              case isCompletions:
                return <RenderCompletionExplenation />

              case isCode:
                return <RenderCodeExplenation />
              default:
                return null
            }
          })()}
        </div>
      </div>
      <form className="mt-10 flex flex-col" onSubmit={completions}>
        <label className="flex justify-center" htmlFor="userInput">
          Enter your text below!
        </label>
        <textarea
          id="userInput"
          name="userInput"
          className="border-2 border-gray-700"
          rows={10}
          cols={50}
        ></textarea>
        <button
          className="mt-2 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          type="submit"
        >
          Submit
        </button>
      </form>
      <div className="mt-4 flex">
        <select
          className="border-2 border-gray-400"
          onChange={(e) => {
            let value = e.target.value
            if (value === 'completion') {
              setIsCompletions(true)
              setIsAnswers(false)
              setIsCode(false)
            } else if (value === 'answer') {
              setIsAnswers(true)
              setIsCompletions(false)
              setIsCode(false)
            } else if (value === 'code') {
              setIsCode(true)
              setIsCompletions(false)
              setIsAnswers(false)
            } else if (value === 'none') {
              setIsCode(false)
              setIsAnswers(false)
              setIsCompletions(false)
            }
          }}
        >
          <option value="none">---Choose Your Engine---</option>
          <option value="completion">Completion</option>
          <option value="answer">Answer</option>
          <option value="code">Code</option>
        </select>
      </div>
    </div>
  )
}

export default Home
