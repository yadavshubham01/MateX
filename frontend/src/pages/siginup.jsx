// src/LoginModal.js
import React, { useContext, useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';



const clientId = import.meta.env.REACT_APP_GOOGLE_CLIENT_ID || "548854258712-ml0boj0dt3dkb5ot1lud9l8fe7vj17c9.apps.googleusercontent.com";
export const SignUp = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1); // Step 1: Username/Email, Step 2: Password
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate=useNavigate()

    const handleGoogleLogin = async (credentialResponse) => {
      try {
        const res = await axios.post("http://localhost:5000/api/auth/google", {
          idToken: credentialResponse.credential,
        });
        
        localStorage.setItem("token", res.data.token);
        login(res.data.user);
        console.log(res)
        navigate("/dashboard");
      } catch (error) {
        console.error("Google login failed:", error);
      }
    };

  if (!isOpen) return null;
  const handleNext = () => {
    if (email.trim()) {
      setStep(2); // Proceed to Step 2 if username/email is filled
    }
  };

  const handleLogin = async() => {
    // Add your login logic here
    const res= await axios.post("http://localhost:5000/api/auth/register",{
        email,
        password,
        username
     });
     console.log(res.data.token)
     localStorage.setItem("token",res.data.token)
     navigate("/dashboard")
    console.log('Logging in with:', { email, password });
    onClose(); // Close the modal after login
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-none bg-gray-900/70">
      <div className="relative w-full max-w-md p-6 bg-black rounded-lg shadow-lg">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          &times;
        </button>
        
        <h2 className="text-2xl font-bold text-center text-white mb-4"> {step === 1 ? 'Sign in to X' : 'Enter Password'}</h2> 
        {step === 1 ? (
       <> 
         <input
          type="text"
          placeholder="Phone, email ...."
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 text-black rounded focus:outline-none"
         />
        
        <button onClick={handleNext} className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-500">
          Next
        </button>
        <div className="my-4 text-center text-gray-500">or</div>
        <GoogleLogin // Store your client ID in .env file
           onSuccess={handleGoogleLogin}
           onError={() => console.error("Google login failed")}
        />
        </>
      
       ) : (
            <>
              {/* Step 2: Password */}
              <div className="mb-4">
              <label className="block mb-1 text-gray-400"> Email</label>
              <input
                type="text"
                value={email}
                readOnly
                className="w-full px-4 py-2 mb-2 text-gray-500 bg-gray-800 rounded cursor-not-allowed focus:outline-none"
              />
             </div>
             <input
                type="password"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 mb-4 text-black rounded focus:outline-none"
              />

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mb-4 text-black rounded focus:outline-none"
              />
  
              <button
                onClick={handleLogin}
                className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-500"
              >
                Login
              </button>
            </>
       ) }

            {step === 1 && (
          <button className="w-full px-4 py-2 mt-2 text-gray-400 hover:underline">
            Forgot password?
          </button>
        )}
      </div>
    </div>
    </GoogleOAuthProvider>
  );
};


