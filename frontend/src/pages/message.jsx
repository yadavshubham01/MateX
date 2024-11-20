import MessageList from "../components/MessageList";
import Sidebar from "../components/SideBar";
import Trending from "../components/Trending";

export const Message = () => {
    return (
        <div className="min-h-[100vh] bg-black text-white ">
   <div className="flex flex-row">
 <Sidebar/>
 
  <div className='w-[50%]'>
   <MessageList/>
 </div>
 
 <Trending/>
 </div>
 </div>
    );
}