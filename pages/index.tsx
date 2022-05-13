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
  const [isAnswersDocs, setIsAnswersDocs] = useState('')
  const [isCompletions, setIsCompletions] = useState(false)
  const [isEdits, setIsEdits] = useState(false)
  const [isEditsInstructions, setIsEditsInstructions] = useState('')
  console.log(isEditsInstructions)

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
  async function answers(e: any) {
    e.preventDefault()
    let inputValue = e.target[0].value
    let data = {
      documents: [isAnswersDocs],
      question: inputValue,
    }
    try {
      const res = await axios.post('api/answers', data)
    } catch (err) {
      console.log(err)
    }
  }
  async function edits(e: any) {
    e.preventDefault()
    let inputValue = e.target[0].value
    let data = {
      input: inputValue,
      instruction: isEditsInstructions,
    }
    console.log(data)
    try {
      const res = await axios.post('api/edits', data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="max-w-xl">
        <h1 className="text-center text-[30px]">Fun With AI!</h1>
        <div>
          {(() => {
            switch (true) {
              case isAnswers:
                return (
                  <div className="flex flex-col justify-center">
                    <p className="mx-2 text-center">
                      In this field you are welcome to ask any questions you
                      desire! The first input field asks you to give the engine
                      some data to answer the question. Please construct your
                      question to pertain to this data.
                      <br></br><br></br>This is an AI engineered bot that is programmed
                      to give you the best response catered to your question.
                      This is done utilizing GPT-3 created by{' '}
                      <span className="text-blue-600 underline">
                        <a href="https://openai.com/api/" target="_blank">
                          OpenAI
                        </a>
                      </span>
                      !
                    </p>
                    <h2 className="mt-6 text-center">
                      Input your data below. Please seperate your entries by
                      commas or it will not work.
                    </h2>
                    <h2 className="mt-2 text-center">HERE</h2>
                    <input
                      placeholder="example: Puppy A is happy, Puppy B is sad"
                      className="mx-2 h-10 border-2 border-gray-300"
                      value={isAnswersDocs}
                      onChange={(e) => {
                        e.preventDefault()
                        setIsAnswersDocs(e.target.value)
                      }}
                    ></input>
                  </div>
                )

              case isCompletions:
                return (
                  <p className="mx-2 text-center">
                    In this field you are welcome to write any prompt you want
                    and the bot will do its best to finish the statement! This
                    is an AI engineered bot that is programmed to give you the
                    best response catered to your input. This is done utilizing
                    GPT-3 created by{' '}
                    <span className="text-blue-600 underline">
                      <a href="https://openai.com/api/" target="_blank">
                        OpenAI
                      </a>
                    </span>
                    !
                  </p>
                )

              case isEdits:
                return (
                  <div className="flex flex-col justify-center">
                    <p className="mx-2 text-center">
                      In this field you are welcome to ask the AI to create a
                      snippet of code, try your best to give the bot as many
                      details as possible to better format the code you are
                      looking for. This is an AI engineered bot that is
                      programmed to give you the best response catered to your
                      input. This is done utilizing GPT-3 created by{' '}
                      <span className="text-blue-600 underline">
                        <a href="https://openai.com/api/" target="_blank">
                          OpenAI
                        </a>
                      </span>
                      !
                    </p>
                    <h2 className="mt-6 text-center">
                      Input your instructions of what you would like done to
                      your text
                    </h2>
                    <h2 className="mt-2 text-center">HERE</h2>
                    <input
                      placeholder="example: fix the spelling mistakes"
                      className="mx-2 h-10 border-2 border-gray-300"
                      value={isEditsInstructions}
                      onChange={(e) => {
                        e.preventDefault()
                        setIsEditsInstructions(e.target.value)
                      }}
                    ></input>
                  </div>
                )
              default:
                return null
            }
          })()}
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <form
          className="mx-4 mt-10 flex flex-col justify-center"
          onSubmit={answers}
        >
          <label className="flex justify-center" htmlFor="userInput">
            Enter your text below!
          </label>
          <textarea
            id="userInput"
            name="userInput"
            className="border-2 border-gray-700"
            rows={10}
            cols={35}
          ></textarea>
          <button
            className="mx-6 mt-2 flex justify-center rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="mt-4 flex">
        <select
          className="border-2 border-gray-400"
          onChange={(e) => {
            let value = e.target.value
            if (value === 'completion') {
              setIsCompletions(true)
              setIsAnswers(false)
              setIsEdits(false)
            } else if (value === 'answer') {
              setIsAnswers(true)
              setIsCompletions(false)
              setIsEdits(false)
            } else if (value === 'edits') {
              setIsEdits(true)
              setIsCompletions(false)
              setIsAnswers(false)
            } else if (value === 'none') {
              setIsEdits(false)
              setIsAnswers(false)
              setIsCompletions(false)
            }
          }}
        >
          <option value="none">---Choose Your Engine---</option>
          <option value="completion">Completion</option>
          <option value="answer">Answer</option>
          <option value="edits">Edit</option>
        </select>
      </div>
    </div>
  )
}

export default Home
