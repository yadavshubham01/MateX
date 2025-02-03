import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chat from './Chat';

export const MessagingList = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://matex.onrender.com/api/auth/all?query=${query}');
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);


  const profileImageUrl = users.profileImage

  if (selectedUser) {
   
    return (
      <Chat
        currentUser={{ id: "currentUserId", username: "currentUsername" }} 
        chatWithUser={selectedUser}
        roomId={`room-${selectedUser.id}`} 
      />
    );
  }
  const limitedUsers = users.slice(0, 7);

  return (
    <div className="bg-black text-white h-screen p-4">
      <div className="flex justify-between items-center border-b border-gray-700 pb-3">
        <h1 className="text-xl font-bold">Messages</h1>
        <button className="text-lg text-blue-500 hover:underline">+</button>
      </div>

      <div className="mt-3">
        <input
          type="text"
          placeholder="Search Direct Messages"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-gray-800 text-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      <div className="mt-4 space-y-4">
        {limitedUsers.map((user) => (
          <div key={user.id} onClick={() => setSelectedUser(user)}
            className="flex items-center space-x-4 p-2 hover:bg-neutral-800 rounded-md cursor-pointer border-b border-l-0 border-r-0 border-t-0 border-neutral-700"
          >
           
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
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <h2 className="font-semibold">{user.username}</h2>
                </div>
                <span className="text-sm text-gray-500">{Date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


