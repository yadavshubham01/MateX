export const Button = ({label , onChange}) => {
    return   <div className="flex flex-col justify-center">
    <button onClick={onChange} type="buttton" className="w-[50%] items-center text-gray-400 bg-white hover:bg-blue-600 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{label}</button>
   </div>
}