import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'
import Timer from './components/Timer'

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choicetwo, setChoiceTwo] = useState(null)
  const [disable, setDisable] = useState(false)

  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffleCards)
      setTurns(0)
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
  useEffect(()=> {
    if(choiceOne && choicetwo) {
      setDisable(true) 
      if (choiceOne.src === choicetwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choicetwo])

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisable(false)
  }


  useEffect(() => {
    shuffleCards()
  }, [])
  return (
    <div className="App">
      <h1>Memory PWA</h1>
      <button onClick={shuffleCards}>New Game</button>
      <Timer secondes={60}/>
      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard 
          key={card.id} 
          card={ card } 
          handleChoice={handleChoice} 
          flipped={card === choiceOne || card === choicetwo || card.matched} 
          disable={disable}/>
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App
