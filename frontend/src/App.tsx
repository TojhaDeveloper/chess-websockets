import { useState } from 'react'
import { BrowserRouter,Routes,Route } from "react-router-dom"
import './App.css'
import { Game } from './screens/Game'
import { Landing } from './screens/Landing'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="h-screen bg-slate-500">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing/>}/> {/* 👈 Renders at /app/ */}
      <Route path="/game" element={<Game/>}/> {/* 👈 Renders at /app/ */}
    </Routes>
  </BrowserRouter>
    </div>
  )
}

export default App
