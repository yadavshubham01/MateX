// frontend/src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser ] = useState(null);
    const [posts, setPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setUser (response.data.user);
                setPosts(response.data.posts);
                setLikedPosts(response.data.likedPosts);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUser();
    }, []);

    if (!user) return <div>Loading...</div>;

    return (
        <div className="bg-black text-white min-h-screen p-6">
            <h1 className="text-3xl font-bold mb-4">{user.name}'s Profile</h1>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Location:</strong> {user.location}</p>
            <p><strong>Bio:</strong> {user.bio}</p>

            <h2 className="text-2xl mt-6">Posts Created by Me:</h2>
            <div className="space-y-4">
                {posts.map(post => (
                    <div key={post.id} className="border p-4 rounded-md">
                        <p>{post.description}</p>
                    </div>
                ))}
            </div>

            <h2 className="text-2xl mt-6">Previously Liked Posts:</h2>
            <div className="space-y-4">
                {likedPosts.map(post => (
                    <div key={post.id} className="border p-4 rounded-md">
                        <h3 className="font-semibold">{post.title}</h3>
                        <p>{post.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;