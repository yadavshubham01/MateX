import React, { useState } from 'react';
import { CiHeart } from "react-icons/ci";
import { FiShare } from "react-icons/fi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import axios from 'axios';

const Post = ({ project }) => {
  const [updatedProject, setUpdatedProject] = useState(project);
  const [commentText, setCommentText] = useState(""); 
  const [liked, setLiked] = useState(false);
  // Initial coun
  
   // Like the project
   const handleLike = async () => {
    try {
      setliked((prevLiked) => !prevLiked);
      const token = localStorage.getItem("token")
      const YOUR_USER_ID = localStorage.getItem("userId");
       
      const response = await axios.post(`https://matex.onrender.com/api/projects/projects/${updatedProject.id}/like`,{}, {
        headers: {
            Authorization: `Bearer ${token}` // Include the token in the Authorization header
        }
    });
      setUpdatedProject(response.data);
      const userLiked = response.data.likes.includes(YOUR_USER_ID);
      setliked(userLiked);
     // Update the local state with the new project data
    } catch (err) {
      console.error('Error liking the project:', err);
      setliked((prevLiked) => !prevLiked);
    }
  };

  // Share the project
  const handleShare = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post(`https://matex.onrender.com/api/projects/projects/${updatedProject.id}/share`,{}, {
        headers: {
            Authorization: `Bearer ${token}` // Include the token in the Authorization header
        }
    });
      setUpdatedProject(response.data); // Update the local state with the new project data
    } catch (err) {
      console.error('Error sharing the project:', err);
    }
  };

  // Join the project team
  const handleJoin = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post(`https://matex.onrender.com/api/projects/projects/${updatedProject.id}/join`,{}, {
        headers: {
            Authorization: `Bearer ${token}` // Include the token in the Authorization header
        }
    });
      setUpdatedProject(response.data); // Update the local state with the new project data
    } catch (err) {
      console.error('Error joining the project:', err);
    }
  };

  // Comment on the project
  const handleCommentSubmit = async () => {
    if (!commentText.trim()) {
      return; // Don't submit empty comments
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `https://matex.onrender.com/api/projects/projects/${updatedProject.id}/comment`,
        { text: commentText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUpdatedProject(response.data); // Update project with new comment
      setCommentText(""); // Clear comment input
    } catch (err) {
      console.error('Error commenting on the project:', err);
    }
  };

  // Redirect to post detail page when the comment button is clicked
 
  

  return (
      
    <div className=" bg-black text-white shadow-md  p-4 mb-4 hover:bg-neutral-900 border-t-0 border-b border-r-0 border-l-0 border-[1px] border-neutral-600">
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
        <button onClick={handleLike} className={`flex items-center justify-center w-10 h-10 p-2 transition-colors ${
        liked ? "text-pink-600" : "text-gray-500"
      }"} 
        hover:text-pink-400 transition-transform transform 
        ${liked ? "scale-110" : "scale-100"}`}>
           <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          d={
            liked
              ? "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              : "M12.1 18.55l-.1.1-.11-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5 18.5 5 20 6.5 20 8.5c0 2.89-3.14 5.74-7.9 10.05z"
          }
        />
      </svg>
       </button>
        <span className="ml-2">{project.likes.length}</span>
      </div>

      {/* Shares Section */}
      <div className="shares flex items-center mb-2">
        <button onClick={handleShare} className="px-1 py-1 text-white hover:rounded-full hover:text-blue-600 hover:bg-sky-200 bg-inherit cursor-pointer  ">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-5 h-5 "
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 4v16m8-8H4"
        />
      </svg>
        </button>
        <span className="ml-2">{project.shares.length}</span>
      </div>
          
      <div className="flex items-center mb-2">
        <button onClick={handleJoin} className="px-1 py-1 text-white hover:rounded-full hover:text-cyan-600 hover:bg-cyan-200">
          <AiOutlineUsergroupAdd className='text-xl'/>
        </button>
        <span className="ml-2">{project.shares.length}</span>
      </div>   
      {/* Comments Section */}
      <div className="flex items-center">
        <h3 className="text-md font-semibold mb-1">
          <FaRegComment className="text-xl" /> 
        </h3>        
        {updatedProject.comments.map((comment) => (
          <div key={comment.id} className="comment flex items-start mb-2">
            <img
              src={comment.user.profileImage}
              alt={`${comment.user.name}'s profile`}
              className="w-6 h-6 rounded-full mr-2"
            />
            <div>
              <span className="font-semibold">{comment.user.username}</span>
              <p className="text-gray-600">{comment.text}</p>
              <small className="text-gray-400">
              {new Date(comment.createdAt).toLocaleString()}
              </small>
          </div>
        </div>
      ))}
        </div>
        
      </div>
      <div className="mb-1 flex flex-row w-[100%] gap-5 mt-2">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            className="w-[60%]  rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className='flex justify-center w-[15%]'>
          <button onClick={handleCommentSubmit} className=" w-full h-[80%] bg-sky-500 text-white rounded hover:bg-sky-600">
            Comment
          </button>
          </div>
        </div>
    </div>
  );
};

export default Post;
