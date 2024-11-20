import React, { useState } from "react";
import Sidebar from "../components/SideBar";
import Trending from "../components/Trending";
import { RiTwitterXLine } from "react-icons/ri";
import { SlLogin } from "react-icons/sl";
import { SignIn } from "./signin";
import { FaGithub } from "react-icons/fa";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import Chat from "../components/Chat";

export const Home = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    
 return <div className="min-h-[100vh] bg-black text-white ">
  <div className="flex flex-row">
 <Sidebar/>
 
 <div className="w-[60%] bg-black ">   
  <div className="h-screen flex justify-center bg-black">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg p-2 h-max px-4 w-[90vh] border border-neutral-600">
            <div className="flex flex-col items-center">
           <h1 className="font-semibold text-xl text-gray-200">WELCOME TO MATEX</h1>
            <h2 className="font-serif text-lg pt-2 text-gray-200 pb-2 ">Welcome to MateX, a platform where creators and collaborators unite! Post your project requirements, connect with like-minded individuals, and build teams to bring your ideas to life. Whether you're looking for partners or want to contribute, 
                this is the place to turn your vision into reality.</h2>
           </div>
           <div className="relative text-white">  {/*onClick={() => setModalOpen(true)} */}
         <header className="p-4 flex flex-row gap-3 items-center">
         <button onClick={() => setModalOpen(true)} className="flex items-center  hover:bg-neutral-700  rounded-md py-2 px-4 font-semibold space-x-2">
        <SlLogin className="text-xl" />
        <span>Logic</span>
       </button>
        <button  className="flex items-center  hover:bg-neutral-700  rounded-md py-2 px-4 font-semibold space-x-2">
        <FaGithub className="text-xl" />
        <a href="https://github.com/yadavshubham01">GitHub</a>
       </button>
       <button className="flex items-center w-[15vh]  hover:bg-neutral-700  rounded-md py-2 px-4 font-semibold space-x-2">
        <RiTwitterXLine className="text-lg" />
        <a href="https://x.com/yadavshubham_1">Twitter</a>
       </button>
       <button className="flex items-center w-[15vh]  hover:bg-neutral-700  rounded-md py-2 px-4 font-semibold space-x-2">
        <MdOutlineMarkEmailUnread className="text-lg"/>
        <a href="yadavshubham4062@gmail.com">Email</a>
       </button>
      </header>
      
      
      {/* Blurred background with modal */}
      <SignIn isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      </div> 
          </div>
       </div>
    </div>        
 </div>
 
 <Trending/>
 </div>
 </div>
}


/*<div className='grid grid-cols-10 pb-3 text-lg'>
        <div className="justify-start pt-1">
         <GoArrowLeft className='text-3xl'/>
        </div>
        <div className="items-center pt-1 font-bold text-xl">
        Post
        </div>
    </div>

    */