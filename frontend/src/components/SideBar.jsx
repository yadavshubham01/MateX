import React, { useContext, useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import yourImage from '../images/logo.png';
import { CiHome, CiSearch ,CiCircleMore } from "react-icons/ci";
import { SignIn } from "../pages/signin";
import Profile from "./profile";
import { AuthContext } from "../context/AuthContext";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
   const navigate = useNavigate();
   const {  logout } = useContext(AuthContext);
   const handlePostClick = () => {
     navigate('/publish');  // Navigate to the 'publish' route
   };
   
   const handleToggle = () => setIsOpen(!isOpen);
   const handleMsgClick = () => {
    navigate('/msg');  // Navigate to the 'publish' route
  };
   const handleCreateClick = () => {
    navigate('/create');  // Navigate to the 'publish' route
  };
   const handleHomeClick = () => {
    navigate('/home');  // Navigate to the 'publish' route
  };
  
  const logOut=() => {
     logout()    
    window.location.href = '/';  // Redirect the user to login page
  }
  
  const handlePostsClick = () => {
    navigate('/dashboard');  // Navigate to the 'publish' route
  };
  return (
    <>
     <button
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-black p-2 rounded-full"
        onClick={handleToggle}
      >
        ☰
      </button>
    <div className={`fixed top-0 left-0 h-full bg-black text-white flex flex-col p-4 space-y-6 z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-[18%] transition-transform duration-300 border-gray-700 border-r border-l-0 border-[1px] border-t-0 border-b-0 `}>
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
      <button onClick={handleMsgClick} className="flex items-center  hover:bg-neutral-700  rounded-full py-2 px-4 font-semibold space-x-2">
        <HiOutlineEnvelope className="text-3xl" />
        <span>Messages</span>
      </button>
      <button onClick={handleCreateClick} className="flex items-center  hover:bg-neutral-700  rounded-full py-2 px-4 font-semibold space-x-2">
        <GoPerson className="text-3xl" />
        <span>Profile</span>
      </button>
      <button onClick={logOut} className="flex items-center  hover:bg-neutral-700  rounded-full py-2 px-4 font-semibold space-x-2">
        <CiCircleMore className="text-3xl" />
        <span>Logout</span>
      </button>
      <button onClick={handlePostClick} className="mt-4 w-[90%] px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full">Post</button>  
      <div className="mt-4 w-[90%] px-5 py-3 rounded-full hover:bg-neutral-900">
      <Profile />
    </div>
    </div>
    {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={handleToggle}
        />
      )}
  </>
  );
}

export default Sidebar;

/*w-[20%] min-h-[100vh] p-4 gap-1 flex flex-col  border-gray-700 border-r border-l-0 border-[1px] border-t-0 border-b-0 space-y-6 bg-black*/