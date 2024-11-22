import React, { useContext, useState } from "react";
import { RiTwitterXLine } from "react-icons/ri";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { SignIn } from "./signin";
import { AuthContext } from "../context/AuthContext";
import { CreateUser } from "./CreateUser";

const clientId = import.meta.env.VITE_API_GOOGLE_CLIENT_ID ;

export const SignUp = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalCreateOpen, setModalCreateOpen] = useState(false);
    const navigate =useNavigate();
   const {login}=useContext(AuthContext)
    

    const handleGoogleLogin = async (credentialResponse) => {
        try {
          const res = await axios.post("https://matex.onrender.com/api/auth/google", {
            idToken: credentialResponse.credential,
          });
          
          localStorage.setItem("token", res.data.token);
          login(res.data.user);
          console.log(res)
          navigate("/dashboard");
        } catch (error) {
          console.error("Google login failed:", error);
        }5
      };
  return (
    <GoogleOAuthProvider clientId={clientId}>
    <div className=" bg-black">    
    <div className="grid grid-cols-2 min-h-screen items-center text-gray-200">
     
      <div className="flex flex-col items-center">
        <div className="text-gray-200">
        <RiTwitterXLine className="text-[50vh]"/>
        </div>
      </div>

      
      <div className="flex flex-col justify-start">
        <h1 className="text-7xl text-gray-200 font-bold mb-4">Happening now</h1>
        <div className="">
        <h2 className="text-3xl font-extrabold text-gray-200 pt-4 mb-4">Join today</h2>
        </div>
        <div className="space-y-4">
         <div className="w-[40%]">  
        <GoogleLogin // Store your client ID in .env file
           onSuccess={handleGoogleLogin}
           onError={() => console.error("Google login failed")}
           shape="circle"
        />
         </div>
          <div className="text-gray-200 text-sm my-4 ml-36">or</div>
          <button onClick={() => {
            setModalCreateOpen(true)
           
            }} className="w-[40%] bg-blue-500 text-white py-2 rounded-full font-medium hover:bg-blue-600">
            Create account
          </button>
          
        </div>
        <div>
        <p className="text-sm  text-gray-500 w-[40%]">By signing up, you agree to the Terms of Service and 
            Privacy Policy, including Cookie Use.</p>
        </div>

        
        <p className="text-lg mt-6 flex flex-col items-start pt-3 pb-2">
          Already have an account?
         <div className="pt-2 w-full">  
          <button onClick={() => {
           setModalOpen(true)  // Navigate to the 'publish' route
        }} className="text-blue-500 w-[40%] bg-black border-neutral-800 border-l border-t border-[1px]  py-2 rounded-full font-semibold hover:bg-neutral-900 ">
            Sign in
          </button>
         </div> 
        </p>
      </div>
     </div> 
     <SignIn isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      <CreateUser isOpen={isModalCreateOpen} onClose={() => setModalCreateOpen(false)}/>
      {/* Footer Section */}
      <footer className="w-full text-center pb-6 bg-black">
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 mb-4">
          <a href="#about" className="hover:underline">
            About
          </a>
          <a href="#download" className="hover:underline">
            Download the X app
          </a>
          <a href="#help" className="hover:underline">
            Help Centre
          </a>
          <a href="#privacy" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#cookie-policy" className="hover:underline">
            Cookie Policy
          </a>
          <a href="#ads-info" className="hover:underline">
            Ads info
          </a>
          <a href="#accessibility" className="hover:underline">
            Accessibility
          </a>
        
        </div>
        <p className="text-gray-500">© 2024 X Corp.</p>
      </footer>
    </div>
    
    </GoogleOAuthProvider>
  );
};


