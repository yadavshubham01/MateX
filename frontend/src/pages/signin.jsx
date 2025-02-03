import React, { useContext, useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';



const clientId = import.meta.env.VITE_API_GOOGLE_CLIENT_ID ;
export const SignIn = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
   
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
      setStep(2); 
    }
  };

  const handleLogin = async() => {
   
    const res= await axios.post("https://matex.onrender.com/api/auth/login",{
        email,
        password
     });
     
     localStorage.setItem("token",res.data.token)
     navigate("/dashboard")
    console.log('Logging in with:', { email, password });
    onClose(); 
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-none bg-neutral-900/70">
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
        <GoogleLogin 
           onSuccess={handleGoogleLogin}
           onError={() => console.error("Google login failed")}
        />
        </>
      
       ) : (
            <>
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


