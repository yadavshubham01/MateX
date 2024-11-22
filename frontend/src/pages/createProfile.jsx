// frontend/src/pages/CreateProfile.jsx
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { InputBox } from "../components/InputBox";
import { Button } from "../components/button";
import { AuthContext } from '../context/AuthContext';

const CreateProfile = () => {
    const [location, setLocation] = useState("");
    const [bio, setBio] = useState("");
    const [profileImage, setProfileImage] = useState(null); // For profile image
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("location", location);
        formData.append("bio", bio);
        if (profileImage) {
            formData.append("profileImage", profileImage); // Append image file
        }

        try {
           const res= await axios.post("https://matex.onrender.com/api/auth/create", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'multipart/form-data' // Ensure the correct content type is set
                }
            });
            login(res.data.user);
            navigate("/dashboard"); // Redirect to dashboard after profile creation
        } catch (error) {
            console.error("Error creating profile:", error);
        }
    };

    return (
        <div className="h-screen flex justify-center bg-black">
         <div className="flex flex-col justify-center">
          <div className="rounded-lg p-2 h-max px-4 w-[90vh] shadow-sm shadow-neutral-300">
            <h1 className="text-3xl text-white font-bold mb-4">Create Your Profile</h1>
            <form>
                <InputBox onChange={(e) => setLocation(e.target.value)} label={"Location"} placeholder={"Your location"} />
                <div>
                <label for="description" className="block text-lg text-white font-serif">Bio (optional)</label>
                <textarea onChange={(e) => setBio(e.target.value)}  placeholder={"A short bio"}  className='w-full font-serif p-4 text-white bg-black outline-none border-2 rounded-md pt-2'/>
                </div>    
                <input type="file" onChange={(e) => setProfileImage(e.target.files[0])} accept="image/*" className="mt-4 pt-2 pb-2" />
                <Button onChange={handleProfileSubmit} label={"Create Profile"} />
            </form>
            </div>
         </div>
        </div>
    );
};

export default CreateProfile;