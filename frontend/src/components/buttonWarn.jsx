import { Link } from "react-router-dom"
export function ButtonWarning({label,buttonText, to}){
  return <div>
    <div className="text-slate-500">
        {label}
    </div>
    <Link className="underline pl-1 cursor-pointer text-slate-500 hover:text-slate-300" to={to}>
    {buttonText}
    </Link>
  </div>
}