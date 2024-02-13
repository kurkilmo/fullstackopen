import { useState } from 'react'

const Button = ({text, handler}) => <button onClick={handler}>
  {text}
</button>

const StatisticsLine = ({text, value}) => {
  // <p>{text} {value}</p>
  return (
    <tr>
      <th>{text}</th>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad

  if (all === 0) return <div>No feedback given</div>

  const average = (good - bad) / (all)
  const positive = (good / all) * 100

  return (
      <div>
        <table><tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={all} />
          <StatisticsLine text="average" value={average} />
          <StatisticsLine text="positive" value={positive + " %"} />
        </tbody></table>
      </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increment = (value, setter) => () => setter(value + 1)

  return (
    <div>
      <div><h1>give feedback</h1></div>
      <div>
        <Button handler={increment(good, setGood)} text="good" />
        <Button handler={increment(neutral, setNeutral)} text="neutral" />
        <Button handler={increment(bad, setBad)} text="bad" />
      </div>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App