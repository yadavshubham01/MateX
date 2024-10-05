
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import { SignUp } from './pages/siginup'
import { SignIn } from './pages/signin'
import { Dashboard } from './pages/dashboard'


function App() {


  return (
    <BrowserRouter>
      <Routes>
         <Route path="/signup" element={<SignUp/>}></Route>
         <Route path="/signin" element={<SignIn/>}></Route>
         <Route path="/dashboard" element={<Dashboard/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
