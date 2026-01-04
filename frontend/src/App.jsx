import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import QuizList from './pages/QuizList'
import QuizAttempt from './pages/QuizAttempt'
import Result from './pages/Result'
import Login from "./pages/Login"
import ProductedRoute from "./auth/ProductedRoute"

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element = {<Login/>}/>
        <Route element = {<ProductedRoute/>}>
          <Route path = "/quiz/:id" element = {<QuizAttempt/>}/>
          <Route path="/result/:id" element = {<Result/>}/>
          <Route path="/" element={<QuizList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
