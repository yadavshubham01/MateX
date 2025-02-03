import Feed from "../components/feed";
import Sidebar from "../components/SideBar";
import Trending from "../components/Trending";



export const Dashboard = () => {
    
 return <div className="min-h-screen  bg-black text-white overflow-hidden">
  <div className="flex flex-row min-h-screen">
    <div className="w-[10%] md:w-[18%]">
  <Sidebar className=" border-gray-700 border-b border-l-0 border-t-0 border-r-0 border-[1px]"/>
  </div>

 <div className="w-[90%] md:w-[50%] border-gray-700 border-b border-l-[1px] border-t-0 border-r border-[1px]"> 
 <div className=' flex flex-col items-center pt-2 pb-1 gap-2 border-neutral-800 border-b border-l-0 border-t-0 border-r-0 border-[1px]'>
        <div className="text-center font-semibold text-xl">
        For you
        <div className="bg-sky-500 h-[4px] min-w-[72px] absolute gap-2 rounded-sm"></div>
        </div>
    </div>
   
   <Feed/>
   
 </div>
 
 <Trending  className="w-full md:w-[15%] hidden md:block"/>
 
 </div>
 </div>

}