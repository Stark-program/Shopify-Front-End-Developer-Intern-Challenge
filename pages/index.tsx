import type { NextPage } from 'next'
import axios from 'axios'

/*FOR THIS CHALLENGE THE APP MUST CONTAIN
1. A SIMPLE INPUT FORM
2. SUBMITTING THE FORM SUBMITS THE PROMPT TO THE OPENAI
3. RESULTS ARE DISPLAYED IN A LIST, SORTED FROM NEWEST TO OLDEST. EACH RESULT SHOULD INCLUDE
  THE ORIGINAL PROMPT AND A RESPONSE FROM THE API.
*/
const Home: NextPage = () => {
  function test() {
    let data = {
      hello: "world"
    }
    axios.post("/api/hello", data).then((res) => {
      console.log(res)
    })
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <button onClick={test}>test</button>
    </div>
  )
}

export default Home
