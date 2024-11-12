import React from 'react';
import { CiHeart } from "react-icons/ci";
import { FiShare } from "react-icons/fi";
import { FaRegComment } from "react-icons/fa";
const Post = ({ project }) => {
  return (

    <div className="post bg-black text-white shadow-md rounded-lg p-4 mb-4">
      {/* Creator Information */}
      <div className="text-white flex items-center mb-2">
        <img
          src={project.createdBy.profilePicture}
          alt={`${project.createdBy.name}'s profile`}
          className="w-8 h-8 rounded-full mr-2"
        />
        <span>{project.createdBy.name}</span>
      </div>
      {/* Project Title and Description */}
      
      <p className="text-white mb-2">{project.description}</p>
      <div className='grid grid-cols-3 pt-2'>
      {/* Likes Section */}
      <div className="likes flex items-center mb-2">
        <button className="like-button text-white hover:underline">
        <CiHeart className="text-2xl" />
        </button>
        <span className="ml-2">{project.likes.length}</span>
      </div>

      {/* Shares Section */}
      <div className="shares flex items-center mb-2">
        <button className="share-button text-white hover:underline">
          <FiShare className='text-2xl'/>
        </button>
        <span className="ml-2">{project.shares.length}</span>
      </div>

      {/* Comments Section */}
      <div className="comments">
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
