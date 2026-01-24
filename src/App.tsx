import { useEffect, useState } from 'react'
import './App.css'

import spanishWords from './assets/spanish_words.txt?raw'

const words = spanishWords.split('\n').map(w => w.trim()).filter(w => w !== '')

function App() {
  const randomIndex = Math.floor(Math.random() * words.length)
  const [word, setWord] = useState(words[randomIndex])
  const [timerKey, setTimerKey] = useState(0)

  const getNextWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length)
    setWord(words[randomIndex])
  }

  const handleClickNextWord = () => {
    getNextWord()
    setTimerKey(prev => prev + 1)
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      getNextWord()
    }, 3000);
    return () => clearInterval(intervalId);
  }, [timerKey]);


  return (
    <>
      <header className='flex fixed items-center w-full h-12'>
        <span className='p-8 text-xl'>Train Free</span>
      </header>
      <main className='relative w-full h-screen'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <p key={word} className='text-9xl uppercase fade-in-up'>{word}</p>
        </div>
        <button onClick={handleClickNextWord} className='absolute bottom-8 left-1/2 mt-32 -translate-x-1/2 -translate-y-1/2 bg-neutral-900 text-white px-4 py-2 rounded-xl'>Next word</button>
      </main>
    </>
  )
}

export default App
