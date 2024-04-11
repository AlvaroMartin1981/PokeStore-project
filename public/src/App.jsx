import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'
import  Hola from './button'
import Component from './Nvbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Component />
        </Router>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Hola/>
    
    </>
  )
}

export default App
