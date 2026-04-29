import { useState } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import QuizList from './pages/QuizList'
import QuizAttempt from './pages/QuizAttempt'
import Result from './pages/Result'
import Login from "./pages/Login"
import ProtectedRoute from "./auth/ProtectedRoute"
import Register from "./pages/Register"
import CreateQuiz from './pages/CreateQuiz'
import AddQuestions from './pages/AddQuestions'
import AdminDashboard from './pages/AdminDashboard'
import TeacherDashboard from './pages/TeacherDashboard'
import StaffManagement from './pages/StaffManagement'
import Leaderboard from './pages/Leaderboard'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/quiz/:id" element={<QuizAttempt />} />
          <Route path="/result/:id" element={<Result />} />
          <Route path="/" element={<QuizList />} />
          <Route path='/create' element={<CreateQuiz />} />
          <Route path='/create/:id' element={<AddQuestions />} />
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/teacher' element={<TeacherDashboard />} />
          <Route path='/admin/staff' element={<StaffManagement />} />
          <Route path='/teacher/leaderboard/:id' element={<Leaderboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
