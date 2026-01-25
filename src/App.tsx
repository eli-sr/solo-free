import { useEffect, useState } from 'react'
import './App.css'

import spanishWords from './assets/spanish_words.txt?raw'
import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid'
import { ForwardIcon } from '@heroicons/react/24/solid'

const words = spanishWords.split('\n').map(w => w.trim()).filter(w => w !== '')

function App() {
  const randomIndex = Math.floor(Math.random() * words.length)
  const [word, setWord] = useState(words[randomIndex])
  const [timerKey, setTimerKey] = useState(0)
  const [timerDuration, setTimerDuration] = useState(4)
  const [isPaused, setIsPaused] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  const getNextWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length)
    setWord(words[randomIndex])
    setIsExiting(false)
    setTimerKey(prev => prev + 1)
  }

  const handleClickNextWord = () => {
    setIsExiting(true)
    setTimeout(() => {
      getNextWord()
      setTimerKey(prev => prev + 1)
    }, 200)
  }

  const handleTimerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimerDuration(Number(e.target.value))
    setTimerKey(prev => prev + 1)
  }

  useEffect(() => {
    if (isPaused) return

    const exitTimeoutId = setTimeout(() => {
      setIsExiting(true)
    }, (timerDuration * 1000) - 200)

    const changeTimeoutId = setTimeout(() => {
      getNextWord()
    }, timerDuration * 1000)

    return () => {
      clearTimeout(exitTimeoutId)
      clearTimeout(changeTimeoutId)
    }
  }, [timerKey, timerDuration, isPaused]);


  return (
    <>
      <header className='flex fixed items-center w-full h-16 px-8 z-50'>
        <span className='text-2xl font-anton'>JUST FREE.</span>
      </header>
      <main className='relative w-full h-screen'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <p key={word} className={`text-9xl uppercase font-fugaz ${isExiting ? 'fade-out-down' : 'fade-in-up'}`}>{word}</p>
        </div>

        <Controls
          timerDuration={timerDuration}
          onTimerChange={handleTimerChange}
          onNext={handleClickNextWord}
          isPaused={isPaused}
          onTogglePause={() => setIsPaused(prev => !prev)}
        />

        <div className='fixed bottom-8 right-8 z-40'>
          <iframe
            width="300"
            height="300"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https://soundcloud.com/newstreetmelody/sets/trap-beats-rap-beats-freestyle"
            className="opacity-50 hover:opacity-100 transition-opacity"
          />
        </div>
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
      <div className='flex items-center gap-4 border border-white p-3 rounded-2xl'>
        <button
          onClick={onTogglePause}
          className='button'
          title={isPaused ? 'Reanudar' : 'Pausar'}
        >
          {isPaused ? (
            <PlayIcon className='w-5 h-5' />
          ) : (
            <PauseIcon className='w-5 h-5' />
          )}
        </button>

        <div className='w-px h-6 bg-neutral-700'></div>

        <div className='flex items-center gap-3 pl-3'>
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
          title='Siguiente palabra'
        >
          <ForwardIcon className='w-5 h-5' />
        </button>
      </div>
    </div>
  )
}

export default App
