import React from 'react'
import './App.css'
import Die from './components/Die'
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

function App() {
  const [newDice, setNewDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  
  function allNewDice() {
    const arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push(makeNewDice())
    }
    return arr;
  }

  function makeNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function holdDice(id) {
    setNewDice(oldDice => oldDice.map(die => (
        die.id === id ? {
          ...die,
          isHeld: !die.isHeld
        } : die
      )
    ))
  }

  const diceElements = newDice.map(die => (
    <Die value={die.value} isHeld={die.isHeld} key={die.id} id={die.id} onHeld={() => holdDice(die.id)}/>
  ))
  
  function shuffle() {
    setNewDice(oldDice => oldDice.map(die => (
        die.isHeld ?
          die : {...die, value: Math.ceil(Math.random() * 6)} 
      )
    ))
  }

  function newGame() {
    setTenzies(false);
    allNewDice();
  }

  React.useEffect(() => {
    const allHeld = newDice.every(die => die.isHeld === true)
    const firstValue = newDice[0].value
    const allEqual = newDice.every(die => die.value === firstValue)
    if (allHeld && allEqual) {
      console.log('you won!')
      setTenzies(true);
    }
  }, [newDice])


  return (
    <main className="main">
      {tenzies && <Confetti width="400px" height="500px" />}
      <h1 className="title">Tenzies</h1>
      <p className="description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <section className="dice--container">
        {diceElements}
      </section>
      <button onClick={tenzies ? newGame : shuffle}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}

export default App
