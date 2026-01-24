import { useEffect, useState } from 'react'
import './App.css'

const words = [
  'hello',
  'world',
  'typescript',
  'react',
  'vite',
]

function App() {
  const randomIndex = Math.floor(Math.random() * words.length)
  const [word, setWord] = useState(words[randomIndex])

  const handleNextWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length)
    setWord(words[randomIndex])
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log('interval')
      handleNextWord()
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);


  return (
    <>
      <h1>Train Free</h1>
      <p>{word}</p>
      <button onClick={handleNextWord}>Next word</button>
    </>
  )
}

export default App
