import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increment = (operand, func) => {
    const updatedOperand = operand + 1
    func(updatedOperand)
  }

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button handleClick={() => increment(good, setGood)} text="good" />
        <Button handleClick={() => increment(neutral, setNeutral)} text="neutral" />
        <Button handleClick={() => increment(bad, setBad)} text="bad" />
      </div>
      <div>
        <h2>statistics</h2>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
      </div>
    </div>
  )
}

export default App