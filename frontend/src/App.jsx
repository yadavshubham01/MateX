
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import { SignUp } from './pages/siginup'
import { SignIn } from './pages/signin'
import { Dashboard } from './pages/dashboard'

import { Publish } from './pages/Publisg'
import Profile from './pages/profile'
import CreateProfile from './pages/createProfile'
import { Home } from './pages/Home'


function App() {


  return (
    <BrowserRouter>
      <Routes>
         <Route path="/signup" element={<SignUp isOpen={true} onClose={() => navigate(-1)} />} />
         <Route path="/signin" element={<SignIn/>}></Route>
         <Route path="/dashboard" element={<Dashboard/>}></Route>
         <Route path="/publish" element={<Publish/>}></Route>
         <Route path="/profile" element={<Profile/>}></Route>
         <Route path="/create" element={<CreateProfile/>}></Route>
         <Route path="/" element={<Home/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
