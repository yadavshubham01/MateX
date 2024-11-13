import React from 'react';

const UserProfile = ({ profileImage, name, username }) => {
  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg w-64">
      <img
        src={profileImage}
        alt="Profile"
        className="w-24 h-24 rounded-full object-cover mb-4"
      />
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-gray-500">@{username}</p>
    </div>
  );
};

export default UserProfile;  