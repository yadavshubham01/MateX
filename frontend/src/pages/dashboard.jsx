import Feed from "../components/feed";
import Sidebar from "../components/SideBar";
import Trending from "../components/Trending";

import { GoArrowLeft } from "react-icons/go";

export const Dashboard = () => {
    
 return <div className="min-h-[100vh] bg-black text-white ">
  <div className="flex flex-row">
 <Sidebar/>
 
 <div className="w-[60%] border-gray-700 border-b border-l-0 border-t-0 border-r-0 border-[1px]">   
   <Feed/>
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