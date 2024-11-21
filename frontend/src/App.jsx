
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import { SignUp } from './pages/siginup'
import { SignIn } from './pages/signin'
import { Dashboard } from './pages/dashboard'

import { Publish } from './pages/Publisg'
import Profile from './pages/profile'
import CreateProfile from './pages/createProfile'
import { Home } from './pages/Home'
import { AuthProvider } from './context/AuthContext'
import { CreateUser } from './pages/CreateUser'
import { Message } from './pages/message'
import PostDetail from './pages/Post'


function App() {
  

  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
         <Route path="/signin" element={<SignInWrapper />} />
         <Route path="/" element={<SignUp/>}></Route>
         <Route path="/signup" element={<SignUpWrapper/>}></Route>
         <Route path="/dashboard" element={<Dashboard/>}></Route>
         <Route path="/publish" element={<Publish/>}></Route>
         <Route path="/profile" element={<Profile/>}></Route>
         <Route path="/create" element={<CreateProfile/>}></Route>
         <Route path="/home" element={<Home/>}></Route>
         <Route path="/msg" element={<Message/>}></Route>
         <Route path="/post/:postId" element={<PostDetail />} />  
        <Route path="/post/:postId/comments" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}


function SignInWrapper() {
  const navigate = useNavigate(); // This works because it is inside the router context
  return <SignIn isOpen={true} onClose={() => navigate(-1)} />;
}

function SignUpWrapper() {
  const navigate = useNavigate(); // This works because it is inside the router context
  return <CreateUser isOpen={true} onClose={() => navigate(-1)} />;
}
export default App
