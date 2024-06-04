import { useState } from 'react'
import Todo from './todo'
import './todo.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Todo/>
    </>
  )
}

export default App
