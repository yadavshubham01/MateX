
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export const Publish = () => {
    
    const [description, setDescription] = useState("");
    const navigate = useNavigate();


    return <div>
        <form>
     <div className="bg-black min-h-screen md:px-20 pt-6">
    <div className=" bg-black rounded-md border-2 px-6 py-10 max-w-2xl mx-auto">
      <h1 className="text-center text-2xl font-bold text-white mb-10">ADD POST</h1>
      <div className="space-y-4">
        <div>
          <label for="description" className="block mb-2 text-lg font-serif">Description:</label>
          <textarea onChange={(e) => {
            setDescription(e.target.value)
          }}  id="description" cols="30" rows="10" placeholder="write here.." className="w-full font-serif  p-4 text-white bg-black outline-none border-2 rounded-md"></textarea>
        </div>
        
        <button
        onClick={async (e) => {
        e.preventDefault();  // Prevent form submission
       try {
       await axios.post(`http://localhost:5000/api/projects/projects`, {
      
        description
       }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      navigate("/");
     } catch (err) {
       console.error("Error posting project:", err);
     }
    }}
      type="submit"
      className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-600 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-teal-700">
        Add Post
      </button>

      </div>
    </div>
  </div>
</form>
    </div>
}




/*
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
*/