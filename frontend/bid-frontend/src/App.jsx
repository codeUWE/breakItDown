import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GoodNews from './components/GoodNews'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
       <h4 className='text-2xl font-bold'>Hello World</h4>

       <GoodNews/>
      </div>
     
    </>
  )
}

export default App
