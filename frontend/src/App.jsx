import { useState } from 'react'

import { BrowserRouter, Routes,Route } from 'react-router-dom'
import QuizList from './pages/QuizList'
import QuizAttempt from './pages/QuizAttempt'
import Result from './pages/Result'
import Login from "./pages/Login"
import ProductedRoute from "./auth/ProductedRoute"
import Register from "./pages/Register"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element = {<Login/>}/>
        <Route path = "/register" element = {<Register/>}/>
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
