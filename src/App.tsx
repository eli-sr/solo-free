import { useEffect, useState } from 'react'
import './App.css'

import spanishWords from './assets/spanish_words.txt?raw'

const words = spanishWords.split('\n').map(w => w.trim()).filter(w => w !== '')

function App() {
  const randomIndex = Math.floor(Math.random() * words.length)
  const [word, setWord] = useState(words[randomIndex])
  const [timerKey, setTimerKey] = useState(0)
  const [timerDuration, setTimerDuration] = useState(4)
  const [isPaused, setIsPaused] = useState(false)

  const getNextWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length)
    setWord(words[randomIndex])
  }

  const handleClickNextWord = () => {
    getNextWord()
    setTimerKey(prev => prev + 1)
  }

  const handleTimerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimerDuration(Number(e.target.value))
    setTimerKey(prev => prev + 1)
  }

  useEffect(() => {
    if (isPaused) return
    const intervalId = setInterval(() => {
      getNextWord()
    }, timerDuration * 1000);
    return () => clearInterval(intervalId);
  }, [timerKey, timerDuration, isPaused]);


  return (
    <>
      <header className='flex fixed items-center w-full h-12 px-8 z-50'>
        <span className='text-xl font-medium'>Train Free</span>
      </header>
      <main className='relative w-full h-screen'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <p key={word} className='text-9xl uppercase fade-in-up'>{word}</p>
        </div>

        <Controls
          timerDuration={timerDuration}
          onTimerChange={handleTimerChange}
          onNext={handleClickNextWord}
          isPaused={isPaused}
          onTogglePause={() => setIsPaused(prev => !prev)}
        />
      </main>
    </>
  )
}



interface ControlsProps {
  timerDuration: number
  onTimerChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onNext: () => void
  isPaused: boolean
  onTogglePause: () => void
}

const Controls = ({ timerDuration, onTimerChange, onNext, isPaused, onTogglePause }: ControlsProps) => {
  return (
    <div className='fixed bottom-8 left-1/2 -translate-x-1/2 z-50'>
      <div className='flex items-center gap-4 border border-white px-6 py-3 rounded-2xl'>
        <button
          onClick={onTogglePause}
          className='button w-10 px-0!'
          title={isPaused ? 'Reanudar' : 'Pausar'}
        >
          {isPaused ? (
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-5 h-5'>
              <path d='M8 5v14l11-7z' />
            </svg>
          ) : (
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-5 h-5'>
              <path d='M6 4h4v16H6zm8 0h4v16h-4z' />
            </svg>
          )}
        </button>

        <div className='w-px h-6 bg-neutral-700'></div>

        <div className='flex items-center gap-3'>
          <span className='text-xs text-neutral-500 uppercase tracking-wider'>Timer</span>
          <input
            type='range'
            min='2'
            max='12'
            value={timerDuration}
            onChange={onTimerChange}
            className='w-36 h-1.5 bg-neutral-700 rounded-full appearance-none cursor-pointer accent-white'
          />
          <span className='text-sm text-neutral-300 font-medium w-6'>{timerDuration}s</span>
        </div>

        <div className='w-px h-6 bg-neutral-700'></div>

        <button
          onClick={onNext}
          className='button'
        >
          Next word
        </button>
      </div>
    </div>
  )
}

export default App
