import { Navbar } from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();


    return <div>
        <Navbar/>
        <div className="flex justify-center w-full h-screen pt-8 bg-black"> 
            <div className="max-w-screen-lg w-full">
                <input onChange={(e) => {
                    setTitle(e.target.value)
                }} type="text" className=" bg-black border border-gray-300 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title" />
 
                <TextEditor onChange={(e) => {
                    setDescription(e.target.value)
                }} />
                <button onClick={async () => {
                    const response = await axios.post(`http://localhost:5000/api/projects/projects `, {
                        title,
                      description
                    }, {
                        method:"POST",
                        headers: {
                            Authorization: localStorage.getItem("token")
                        }
                    });
                    
                }} type="submit" className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-teal-800 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-teal-700">
                    Post
                </button>
            </div>
        </div>
    </div>
}


function TextEditor({ onChange }) {
    return <div className="mt-2 bg-black text-white">
        <div className="w-full mb-4 ">
            <div className="flex items-center justify-between border">
            <div className="my-2 bg-black text-white rounded-b-lg w-full">
                <label className="sr-only">Publish post</label>
                <textarea onChange={onChange} id="editor" rows={8} className="focus:outline-none block w-full px-0 text-sm text-white bg-black border-0 pl-2" placeholder="Write an article..." required />
            </div>
        </div>
       </div>
    </div>
}