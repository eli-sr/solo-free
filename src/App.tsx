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
      <header className='flex fixed items-center w-full h-12'>
        <span className='p-8 text-xl'>Train Free</span>
      </header>
      <main className='relative w-full h-screen'>
        <p className='absolute top-1/2 left-1/2 text-9xl uppercase -translate-x-1/2 -translate-y-1/2'>{word}</p>
        <button onClick={handleNextWord} className='absolute top-1/2 left-1/2 mt-32 -translate-x-1/2 -translate-y-1/2'>Next word</button>
      </main>
    </>
  )
}

export default App
