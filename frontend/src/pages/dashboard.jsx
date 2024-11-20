import Feed from "../components/feed";
import Sidebar from "../components/SideBar";
import Trending from "../components/Trending";



export const Dashboard = () => {
    
 return <div className="min-h-[100vh] bg-black text-white ">
  <div className="flex flex-row">
 <Sidebar/>
 
 <div className="w-[60%] border-gray-700 border-b border-l-0 border-t-0 border-r-0 border-[1px]"> 
 <div className=' flex flex-col items-center pt-2 pb-1 gap-2 border-neutral-800 border-b border-l-0 border-t-0 border-r-0 border-[1px]'>
        <div className="text-center font-semibold text-xl">
        For you
        <div className="bg-sky-500 h-[4px] min-w-[72px] absolute gap-2 rounded-sm"></div>
        </div>
    </div>
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