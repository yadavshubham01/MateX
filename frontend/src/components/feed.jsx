import React, { useState, useEffect } from 'react';
import Post from './PostDCard';
import { PostSkeleton } from './PostSkeleton';


const Feed = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects from the backend
 
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://matex.onrender.com/api/projects/bulk', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Adjust if needed for auth
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }

        const data = await response.json();
        setProjects(data);
        console.log(projects.id)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Display loading or error message if needed
  if (loading) {
    return <div> 
     {[...Array(4)].map((_, i) => (
        <PostSkeleton key={i} />
      ))}
   </div> 
         
  }  
  if (error) return <PostSkeleton/>;

  // Render each project as a Post component
  return (
    <div className=""> 
     
      {projects.map((project) => (
        <Post key={project.id} project={project} />
      ))}
    </div>
  );
};

export default Feed;
