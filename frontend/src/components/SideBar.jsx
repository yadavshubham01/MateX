import React, { useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import yourImage from '../images/logo.png';
import { CiHome, CiSearch ,CiCircleMore } from "react-icons/ci";
import { SignUp } from "../pages/siginup";
import Profile from "./profile";

function Sidebar() {
   
   const navigate = useNavigate();

   const handlePostClick = () => {
     navigate('/publish');  // Navigate to the 'publish' route
   };

   const handleCreateClick = () => {
    navigate('/create');  // Navigate to the 'publish' route
  };
   const handleHomeClick = () => {
    navigate('/');  // Navigate to the 'publish' route
  };

  const handlePostsClick = () => {
    navigate('/dashboard');  // Navigate to the 'publish' route
  };
  return (
    <div className="w-[20%] min-h-[100vh] p-4 gap-1 flex flex-col  border-gray-700 border-r border-l-0 border-[1px] border-t-0 border-b-0 space-y-6 bg-black">
      <div className="text-3xl font-semibold">
         <h1>MateX</h1>
      </div>
      <button onClick={handleHomeClick} className="flex items-center hover:bg-neutral-700 rounded-full py-2 px-4 font-semibold space-x-2">
        <CiHome className="text-3xl" />
        <span>Home</span>
      </button>
      <button onClick={handlePostsClick} className="flex items-center hover:bg-neutral-700  rounded-full py-2 px-4 font-semibold space-x-2">
        <CiSearch className="text-3xl" />
        <span>Explore</span>
      </button>
      <button className="flex items-center hover:bg-neutral-700  rounded-full py-2 px-4 font-semibold space-x-2">
        <IoNotificationsOutline  className="text-3xl" />
        <span>Notifications</span>
      </button>
      <button className="flex items-center  hover:bg-neutral-700  rounded-full py-2 px-4 font-semibold space-x-2">
        <HiOutlineEnvelope className="text-3xl" />
        <span>Messages</span>
      </button>
      <button onClick={handleCreateClick} className="flex items-center  hover:bg-neutral-700  rounded-full py-2 px-4 font-semibold space-x-2">
        <GoPerson className="text-3xl" />
        <span>Profile</span>
      </button>
      <button onClick={""} className="flex items-center  hover:bg-neutral-700  rounded-full py-2 px-4 font-semibold space-x-2">
        <CiCircleMore className="text-3xl" />
        <span>More</span>
      </button>
      <button onClick={handlePostClick} className="mt-4 w-[90%] px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full">Post</button>  
      <div className="mt-4 w-[90%] px-5 py-3 rounded-full hover:bg-neutral-900">
      <Profile />
    </div>
    </div>
  
  );
}

export default Sidebar;
