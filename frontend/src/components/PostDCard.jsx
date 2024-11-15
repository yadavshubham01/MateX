import React, { useState } from 'react';
import { CiHeart } from "react-icons/ci";
import { FiShare } from "react-icons/fi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import axios from 'axios';
const Post = ({ project }) => {
  const [updatedProject, setUpdatedProject] = useState(project);

   // Like the project
   const handleLike = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/projects/${updatedProject._id}/like`);
      setUpdatedProject(response.data); // Update the local state with the new project data
    } catch (err) {
      console.error('Error liking the project:', err);
    }
  };

  // Share the project
  const handleShare = async () => {
    try {
      const response = await axios.post(`/api/projects/${updatedProject._id}/share`);
      setUpdatedProject(response.data); // Update the local state with the new project data
    } catch (err) {
      console.error('Error sharing the project:', err);
    }
  };

  // Join the project team
  const handleJoin = async () => {
    try {
      const response = await axios.post(`/api/projects/${updatedProject._id}/join`);
      setUpdatedProject(response.data); // Update the local state with the new project data
    } catch (err) {
      console.error('Error joining the project:', err);
    }
  };

  // Comment on the project
  const handleComment = async (commentText) => {
    if (!commentText.trim()) {
      return; // Don't submit empty comments
    }

    try {
      const response = await axios.post(`/api/projects/${updatedProject._id}/comment`, { text: commentText });
      setUpdatedProject(response.data); // Update the local state with the new project data
    } catch (err) {
      console.error('Error commenting on the project:', err);
    }
  };
  

  return (
      
    <div className="post bg-black text-white shadow-md rounded-lg p-4 mb-4">
      {/* Creator Information */}
      <div className="text-white flex items-center mb-2">
        <img
          src={project.createdBy.profilePicture}
          alt={`${project.createdBy.username}'s profile`}
          className="w-8 h-8 rounded-full mr-2"
        />
        <span>{project.createdBy.username}</span>
      </div>
      {/* Project Title and Description */}
      
      <p className="text-white mb-2">{project.description}</p>
      <div className='grid grid-cols-4 pt-2 border-t border-b border-r-0 border-l-0 border-[1px] border-neutral-600'>
      {/* Likes Section */}
      <div className="likes flex items-center mb-2">
        <button onClick={handleLike} className="px-1 py-1 text-white hover:rounded-full hover:text-pink-600 hover:bg-rose-300">
        <CiHeart className="text-2xl" />
        </button>
        <span className="ml-2">{project.likes.length}</span>
      </div>

      {/* Shares Section */}
      <div className="shares flex items-center mb-2">
        <button onClick={handleShare} className="px-1 py-1 text-white hover:rounded-full hover:text-blue-600 hover:bg-sky-200 ">
          <FiShare className='text-2xl'/>
        </button>
        <span className="ml-2">{project.shares.length}</span>
      </div>
          
      <div className="flex items-center mb-2">
        <button onClick={handleJoin} className="px-1 py-1 text-white hover:rounded-full hover:text-cyan-600 hover:bg-cyan-200">
          <AiOutlineUsergroupAdd className='text-2xl'/>
        </button>
        <span className="ml-2">{project.shares.length}</span>
      </div>   
      {/* Comments Section */}
      <div className="hover:text-green-500">
        <h3 className="text-md font-semibold mb-1"><FaRegComment className='text-2xl'/> </h3>
        
        {project.comments.map((comment) => (
          <div key={comment.id} className="comment flex items-start mb-2">
            <img
              src={comment.user.profilePicture}
              alt={`${comment.user.name}'s profile`}
              className="w-6 h-6 rounded-full mr-2"
            />
            <div>
              <span className="font-semibold">{comment.user.name}</span>
              <p className="text-gray-600">{comment.text}</p>
              <small className="text-gray-400">{new Date(comment.createdAt).toLocaleString()}</small>
            </div>
          
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
