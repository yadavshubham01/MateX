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
    
 return <div className="min-h-screen bg-black text-white overflow-hidden ">
  <div className="flex flex-col md:flex-row min-h-screen">
  
  <div className="w-[10%] md:w-[18%]">
  <Sidebar/>
  </div>
 
 <div className="flex-grow w-[90%] md:w-[60%] p-4 flex justify-center  items-center bg-black">
          <div className="max-w-2xl w-full bg-neutral-800 rounded-lg p-6 border border-neutral-600">
            {/* Welcome Section */}
            <div className="text-center mb-6">
              <h1 className="font-semibold text-2xl text-gray-200">
                WELCOME TO MATEX
              </h1>
              <p className="font-serif text-lg pt-2 text-gray-300 ">
                Welcome to MateX, a platform where creators and collaborators
                unite! Post your project requirements, connect with like-minded
                individuals, and build teams to bring your ideas to life.
                Whether you're looking for partners or want to contribute, this
                is the place to turn your vision into reality.
              </p>
            </div>

            {/* Links Section */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-around">
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
              >
                <SlLogin className="text-xl" />
                <span>Login</span>
              </button>
              <a
                href="https://github.com/yadavshubham01"
                className="flex items-center justify-center gap-2 bg-neutral-900 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
              >
                <FaGithub className="text-xl" />
                <span>GitHub</span>
              </a>
              <a
                href="https://x.com/yadavshubham_1"
                className="flex items-center justify-center gap-2 bg-neutral-900 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
              >
                <RiTwitterXLine className="text-xl" />
                <span>Twitter</span>
              </a>
              <a
                href="mailto:example@example.com"
                className="flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-700 text-white py-2 px-4 rounded-lg"
              >
                <MdOutlineMarkEmailUnread className="text-xl" />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* SignIn Modal */}
          <SignIn isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </div>

        {/* Trending Section */}
        
        <Trending  className="w-full md:w-[15%] hidden md:block"/>
      </div>
    </div>
}

