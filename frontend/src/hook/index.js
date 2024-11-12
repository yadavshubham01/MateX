import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', // replace with your actual backend URL
});

export const fetchProjects = async () => {
  const token = localStorage.getItem("token")
  console.log('Token:', token);
  const { data } = await API.get('/api/projects/bulk', {
    headers: {
      Authorization: `Bearer ${token}`, // Assuming Bearer token, adjust if needed
    },
  });
// Assuming bulkProject route is `/projects`
  console.log(data)
  return data;
  
};

export const likeProject = async (id) => {
  const { data } = await API.post(`/api/projects/projects/${id}/like`);
  return data;
};

export const joinProject = async (id) => {
  const { data } = await API.post(`/api/projects/projects/${id}/join`);
  return data;
};
