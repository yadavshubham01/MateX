import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null;
  

  return (
    <div className='flex flex-row justify-center'>
      <div className='w-[30%] h-[100%]'>
      <img src={user.profileImage} 
      referrerPolicy="no-referrer"
      alt="Profile" className="w-10 h-10 rounded-full object-cover" />
      </div>
      <div className='flex flex-col justify-center'>
      <h2 className='text-start font-serif'>{user.username}</h2>
      </div>
    </div>
  );
};

export default Profile;
