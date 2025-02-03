export const PostSkeleton = () => {
  return (
    <div role="status" className="animate-puls">
      <div className="p-4 border-b border-gray-700 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
          <div className="h-8 w-8 bg-gray-700 rounded-full mb-4"></div>
          <div className="h-2 bg-gray-700 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-700 rounded-full mb-2.5"></div>
          <div className="pl-2 font-thin text-slate-700 text-sm flex justify-center flex-col">
            <div className="h-2 bg-gray-700 rounded-full mb-2.5"></div>
          </div>
        </div>
        <div className="text-xl font-semibold pt-2">
          <div className="h-2 bg-gray-700 rounded-full mb-2.5"></div>
        </div>
        <div className="text-md font-thin">
          <div className="h-2 bg-gray-700 rounded-full mb-2.5"></div>
        </div>
        <div className="text-slate-500 text-sm font-thin pt-4">
          <div className="h-2 bg-gray-700 rounded-full mb-2.5"></div>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
