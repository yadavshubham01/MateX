import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate=useNavigate();

  const handleProfile = () => {
    navigate("/profile")
  }
  if (!user) return null;
  
   

   const profileImageUrl = user.profileImage
   ? (typeof user.profileImage 
     ? user.profileImage 
     : `https://matex.onrender.com/${user.profileImage}`) 
   : null;

  return (
    <span onClick={handleProfile} className='flex flex-row justify-center '>
      <div className='w-[30%] h-[100%]'>
      {profileImageUrl ? (
          <img
            src={profileImageUrl}
            referrerPolicy="no-referrer"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white">
           
            <span>A</span>
          </div>
        )}
      </div>
      <div className='flex flex-col justify-center'>
      <h2 className='text-start font-serif'>{user.username}</h2>
      </div>
    </span>
  );
};

export default Profile;
