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
  const [textArea, setTextArea] = useState('')
  const [chooseEngine, setChooseEngine] = useState(true)
  const [isInput, setIsInput] = useState('')
  const [responseReceived, setResponseReceived] = useState(false)
  const [response, setResponse] = useState<CompletionResponse[]>([])
  const [isCategory, setIsCategory] = useState<string>('completion')

  interface CompletionResponse {
    prompt: String
    response: String
  }

  let instructions = {
    completionInstructions:
      '  In this field you are welcome to write any prompt you want and the bot will do its best to finish the statement!',
    answerInstructions:
      'In this field you are welcome to ask any question. The first input field asks you to give the engine some data to answer the question, this is not a requirment, but an option (example: Puppy A is happy, Puppy B is sad. Question: Which puppy is happy?). If you do enter in some data please make sure to seperate them by commas. Please construct your question to pertain to this data.  ',
    editInstructions:
      '  In this field you are welcome to ask the AI to edit any piece of text you want. You will first give the AI some instructions on what to do with the text. (this is the smaller input field, example: edit the spelling) You will then input the text in the bigger area below.',
  }
  //Completions API Endpoint

  async function completions() {
    let inputValue = textArea
    let data = {
      prompt: inputValue,
    }
    try {
      const res = await axios.post('/api/completions', data)
      console.log(res)
      if ('endpoint' in res.data) {
        let answer = {
          endpoint: res.data.endpoint,
          prompt: res.data.prompt,
          response: res.data.response,
        }
        setResponse((oldArray) => [...oldArray, answer])
        setResponseReceived(true)
      } else {
        alert('Something went wrong')
      }
    } catch (err) {
      console.log(err)
    }
  }

  //Answers API endpoint

  async function answers() {
    let inputValue = textArea
    let data = {
      documents: [isInput],
      question: inputValue,
    }
    try {
      const res = await axios.post('api/answers', data)
      if ('endpoint' in res.data) {
        let answer = {
          endpoint: res.data.endpoint,
          input: res.data.input,
          prompt: res.data.prompt,
          response: res.data.response,
        }
        setResponse((oldArray) => [...oldArray, answer])
        setResponseReceived(true)
      } else {
        alert('Something went wrong')
      }
    } catch (err) {
      console.log(err)
    }
  }

  //Edit API endpoint

  async function edits() {
    let inputValue = textArea
    let data = {
      input: inputValue,
      instruction: isInput,
    }
    try {
      const res = await axios.post('api/edits', data)
      if ('endpoint' in res.data) {
        let answer = {
          endpoint: res.data.endpoint,
          input: res.data.input,
          prompt: res.data.prompt,
          response: res.data.response,
        }
        setResponse((oldArray) => [...oldArray, answer])
        setResponseReceived(true)
      } else {
        alert('Something went wrong')
      }
    } catch (err) {
      console.log(err)
    }
  }

  // Two of the endpoints have a different property because they require another text field. This is to check for that property and render accordingly.
  function checkProperty(obj: any) {
    if (obj.hasOwnProperty('input')) {
      return (
        <>
          <h4>{obj.input}</h4>
        </>
      )
    }
  }

  //All of the render functions.

  function renderEngineChoice() {
    return (
      <div>
        <h1 className="text-center">
          You are welcome to choose another category
        </h1>
      </div>
    )
  }
  function renderInput() {
    return (
      <input
        className="mx-2 h-10 border-2 border-gray-300"
        value={isInput}
        onChange={(e) => {
          e.preventDefault()
          setIsInput(e.target.value)
        }}
      ></input>
    )
  }
  function renderResponse() {
    let reverseArr = [...response].reverse()
    return reverseArr.map((res: any) => {
      return (
        <div className="my-4 rounded bg-gray-200">
          <ul>
            <li key={Math.random() * 10} className="py-4 px-4">
              <h4 className="text-gray-400/75">{res.endpoint}</h4>
              <h1 className="text-center text-[25px]">
                Prompt: <span className="font-serif">{res.prompt}</span>
              </h1>
              <h4 className="text-center">{checkProperty(res)}</h4>
              <p className="text-center">
                <span className="bold text-[18px] underline decoration-slate-600">
                  API Response:{' '}
                </span>
                {res.response}
              </p>
            </li>
          </ul>
        </div>
      )
    })
  }
  function renderAnswers() {
    return (
      <div className="flex flex-col justify-center">
        <p className="mx-2 text-center">
          {instructions.answerInstructions}
          <br></br>
        </p>
        {renderInput()}
      </div>
    )
  }
  function renderCompletion() {
    return (
      <p className="mx-2 text-center">{instructions.completionInstructions}</p>
    )
  }
  function renderEdit() {
    return (
      <div className="flex flex-col justify-center">
        <p className="mx-2 text-center">{instructions.editInstructions}</p>
        {renderInput()}
      </div>
    )
  }

  function checkIfTrue(value: string) {
    setTextArea('')
    setIsCategory(value)
    setChooseEngine(false)
  }
  function onSubmit() {
    setTextArea('')
    setIsInput('')
    if (isCategory == 'completion') return completions()
    if (isCategory == 'answer') return answers()
    if (isCategory == 'edit') return edits()
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="max-w-xl">
        <h1 className="text-center text-[30px]">Fun With AI!</h1>
        {chooseEngine && renderEngineChoice()}

        <div className="mt-4 flex justify-center">
          <select
            className="border-2 border-gray-400"
            onChange={(e) => {
              let value = e.target.value
              checkIfTrue(value)
            }}
          >
            <option value="none">---Choose Your Category---</option>
            <option value="completion" selected>
              Completion
            </option>
            <option value="answer">Answer</option>
            <option value="edit">Edit</option>
          </select>
        </div>

        <div>
          {isCategory == 'answer' && renderAnswers()}
          {isCategory == 'completion' && renderCompletion()}
          {isCategory == 'edit' && renderEdit()}
        </div>
        <p className="text-center">
          This program utilizes technology provided by{' '}
          <span className="text-blue-600 underline">
            <a href="https://openai.com/api/" target="_blank">
              OpenAI
            </a>
          </span>
        </p>
      </div>
      <div className="flex flex-col justify-center">
        <form
          className="mx-4 mt-10 flex flex-col justify-center"
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit()
          }}
        >
          <label className="flex justify-center" htmlFor="userInput">
            Enter your text below!
          </label>
          <textarea
            id="userInput"
            name="userInput"
            className="h-96 w-96 border-2 border-gray-700"
            value={textArea}
            onChange={(e) => {
              e.preventDefault()
              setTextArea(e.target.value)
            }}
          ></textarea>
          <button
            className="mx-6 mt-2 flex justify-center rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>

      <div>
        <h1 className="bold mt-4 text-[20px]">RESPONSES</h1>
      </div>
      {responseReceived && <div>{renderResponse()}</div>}
    </div>
  )
}

export default Home
