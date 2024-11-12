import React from "react";

function Trending() {
  return (
    <div className="w-[25%] p-4 min-h-[100vh] bg-black border-gray-700 border-l border-r-0 border-t-0 border-b-0 border-[1px]">
        
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
        <div className="border-b border-gray-700 pb-2">
          <p>Shubham</p>
          <span className="text-white text-sm">9,582 posts</span>
        </div>
        <div className="border-b border-gray-700 pb-2">
          <p>Trending in Rajasthan</p>
          <span className="text-white text-sm">#SI भर्ती_2021_रद्द_करो</span>
        </div>
        <div className="border-b border-gray-700 pb-2">
          <p>Politics</p>
          <span className="text-white text-sm">#UPPSC_No_Normalization</span>
        </div>
      </div>
    </div>
  );
}

export default Trending;
