import React, {useState} from 'react'

const MostVotes = () => {
  return (
    <div>

    </div>
  )

}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(7).fill(0))
  const [bestAnecdote, setBestAnecdote] = useState(0)

  const handleRandom = () => {
    let random = Math.floor(Math.random() * 7)
    while (random === selected) {
      random = Math.floor(Math.random() * 7)
    }
    setSelected(random)
  }

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    let max = Math.max(...copy)
    let index = copy.indexOf(max)
    setBestAnecdote(index)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes</p>
      <button onClick={vote}>Vote</button>
      <button onClick={handleRandom}>Get anecdote</button>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[bestAnecdote]}</p>
      <p>Has {votes[bestAnecdote]} votes</p>
    </div>
  )
}

export default App;
