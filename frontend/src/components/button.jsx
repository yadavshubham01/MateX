export const Button = ({label , onChange}) => {
    return   <div>
    <button onClick={onChange} type="buttton" className="w-full text-white bg-teal-800 hover:bg-teal-700 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{label}</button>
   </div>
}