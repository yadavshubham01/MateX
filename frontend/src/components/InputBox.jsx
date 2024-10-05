export function InputBox({label,placeholder,onChange}){
   return (
    <div>
    <div className="flex justify-start text-white">
        {label}
    </div>
    <input onChange={onChange} placeholder={placeholder} className="w-full px-2 py-1 border border-slate-500"/>
  </div>
   ) 
}