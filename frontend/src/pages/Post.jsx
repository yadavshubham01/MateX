import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';  // Import useParams

const PostDetail = () => {
  const { postId } = useParams();  // Get postId from the URL
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/projects/projects/${postId}`);
        setPost(response.data);
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-detail-container bg-black text-white p-4">
      <h2 className="text-2xl font-bold">{post.title}</h2>
      <p>{post.description}</p>

      {/* Comments Section */}
      <div className="comment-section">
        <h3 className="text-md font-semibold mb-1">Comments</h3>

        {post.comments.map((comment) => (
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

      {/* Add Comment */}
      <div className="comment-input">
        <textarea
          placeholder="Add a comment..."
          className="w-full p-2 mt-2 rounded bg-neutral-800 text-white"
        />
        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Submit Comment
        </button>
      </div>
    </div>
  );
};

export default PostDetail;
