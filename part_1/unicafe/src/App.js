import React, { useState } from 'react'

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const Header = ({header}) => {
  return (
  <div>
    <h1>{header}</h1>
  </div>
)};

const StatisticLine = ({name, number}) => {
  if (name==="Positive") {
    return (
      <tr>
        <td>{name}</td> 
        <td>{number} %</td>
      </tr>
    )
  } else {
    return (
      <tr>
        <td>{name}</td> 
        <td>{number}</td>
    </tr>
  )}
}

const Statistics = ({good, neutral, bad, all, average, positive}) => {
  if (all > 0) {
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine name="Good" number={good}/>
          <StatisticLine name="Neutral" number={neutral}/>
          <StatisticLine name="Bad" number={bad}/>
          <StatisticLine name="All" number={all}/>
          <StatisticLine name="Average" number={average}/>
          <StatisticLine name="Positive" number={positive}/>
        </tbody>
      </table>
    </div>
  )} else {
    return (
      <div> 
        <p>No feedback given</p>
      </div>
    )
}
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + bad + neutral;
  const average = ((good*1)+(neutral*0)+(bad*-1))/all;
  const positive = Math.round((good/all)*100);


  return (
  <div>
    <Header header="Give Feedback"/>
    <Button handleClick={() => setGood(good + 1)} text="Good"/>
    <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral"/>
    <Button handleClick={() => setBad(bad + 1)} text="Bad"/>
    <Header header="Statistics"/>
    <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
  </div>
)}
export default App