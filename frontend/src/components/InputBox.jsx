export function InputBox({label,placeholder,onChange}){
   return (
    <div>
    <div className="flex justify-start text-lg text-white">
        {label}
    </div>
    <input onChange={onChange} placeholder={placeholder} className="w-full font-serif p-4 text-white bg-black outline-none border-2 rounded-md"/>
  </div>
   ) 
}