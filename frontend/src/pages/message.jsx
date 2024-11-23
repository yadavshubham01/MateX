import  { MessagingList } from "../components/MessageList";
import Sidebar from "../components/SideBar";
import Trending from "../components/Trending";

export const Message = () => {
    return (
        <div className="min-h-[100vh] bg-black text-white overflow-hidden">
   <div className="flex flex-row">
   <div className="w-[10%] md:w-[18%]">
  <Sidebar className=""/>
  </div>
 
  <div className='w-[80%] md:w-[58%] border-gray-700 border-b-0 border-l border-t-0 border-r border-[1px]'>
   <MessagingList/>
 </div>
 
 
 <Trending className="hidden md:block md:w-[20%]" />

 </div>
 </div>
    );
}