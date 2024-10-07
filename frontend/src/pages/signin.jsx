import yourImage from '../images/bg2.jpg';
import { Button } from "../components/button";
import { ButtonWarning } from "../components/buttonWarn";
import { Heading } from "../components/heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


export const SignIn = () => {
    const [ email ,setUsername ] = useState("");
    const [ password ,setPassword ] = useState("");
    const navigate =useNavigate();

    return <div style={{
        backgroundImage: `url(${yourImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100%'
      }} >
        
        <div className="h-screen flex justify-center">
         <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-black w-90 text-center p-2 h-max px-4 shadow-lg shadow-black">
          <Heading label={"Sign In"}/>
         <SubHeading label={"Enter your credentials to access your account"}/>
         <InputBox onChange={(e)=>{
            setUsername(e.target.value)
         }} label={"Email"} placeholder={"johndoe@gmail.com"}/>
          <InputBox onChange={(e) =>{
           setPassword(e.target.value)
          }} label={"Password"} placeholder={"123456"}/>
            <div className="pt-4">
                <Button onChange={async() => {
                     const res= await axios.post("http://localhost:5000/api/auth/login",{
                        email,
                        password
                     });
                     console.log(res.data.token)
                     localStorage.setItem("token",res.data.token)
                    navigate("/dashboard")
                }} label={"Log In"}/>
            </div>
            <ButtonWarning label={"Don't have an account"} buttonText={"Sign Up"} to={"/signup"} />
           </div>
           </div>
        </div>
    </div>
}