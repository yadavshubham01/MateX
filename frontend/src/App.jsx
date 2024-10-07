
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import { SignUp } from './pages/siginup'
import { SignIn } from './pages/signin'
import { Dashboard } from './pages/dashboard'
import CalendarComponent from './pages/calender'
import { Publish } from './pages/Publisg'


function App() {


  return (
    <BrowserRouter>
      <Routes>
         <Route path="/signup" element={<SignUp/>}></Route>
         <Route path="/signin" element={<SignIn/>}></Route>
         <Route path="/dashboard" element={<Dashboard/>}></Route>
         <Route path="/calender" element={<CalendarComponent/>}></Route>
         <Route path="/publish" element={<Publish/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
