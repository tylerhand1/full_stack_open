import {useState} from 'react'

const Display = props => <div>{props.value}</div>

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const [value, setValue] = useState(10)

  const setToValue = (newValue) => {
    setValue(newValue)
  }

  return (
    <div>
      <Display value={value} />
      <Button handleClick={() => setToValue(1000)} text="thousand" />
      <Button handleClick={() => setToValue(0)} text="zero" />
      <Button handleClick={() => setToValue(value + 1)}  text="increment" />
    </div>
  )
}

export default App
