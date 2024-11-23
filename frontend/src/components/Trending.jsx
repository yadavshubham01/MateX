import React, { useState } from "react";

function Trending() {

  const [isVisible, setIsVisible] = useState(false); // State to manage visibility

  const toggleTrending = () => {
    setIsVisible((prev) => !prev); // Toggle visibility
  };

  return (
    <>
    <div className="md:hidden p-4">
        <button
          onClick={toggleTrending}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full w-full"
        >
          {isVisible ? "T" : "T"}
        </button>
      </div>
    <div className={`${
          isVisible ? "block" : "hidden"
        } md:block w-full md:w-[25%] p-4 bg-black border-gray-700 border-l md:min-h-[100vh] border-t-0 border-b-0 border-r-0`}>
        
     <form class="max-w-md mx-auto">   
       <label for="default-search" class="mb-2 text-sm font-medium text-gray-300 sr-only dark:text-white">Search</label>
       <div class="relative">
       <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-200 bg-neutral-800 hover:bg-neutral-950 rounded-full" placeholder="Search" required />
         <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-300 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
         </div>   
      </div>
     </form>

      <h3 className="text-lg pt-3 font-bold mb-4">What's happening</h3>
      <div className="space-y-4">
        <div className="border-b border-gray-700 hover:bg-neutral-700 rounded-sm pl-2 pt-2 pb-2">
          <p>MateX</p>
          <span className="text-white text-sm">9,582 posts</span>
        </div>
        <div className="border-b border-gray-700  hover:bg-neutral-700 rounded-sm pl-2 pt-2 pb-2">
          <p>SHUBHAM YADAV</p>
          <span className="text-white text-sm">Full Stack Engineer</span>
        </div>
        <div className="border-b border-gray-700 hover:bg-neutral-700 rounded-sm pl-2 pt-2 pb-2">
          <p>Let's Go</p>
          <span className="text-white text-sm">Chat with each other</span>
        </div>
      </div>
    </div>
    </>
  );
}

export default Trending;
