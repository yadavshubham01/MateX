// frontend/src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBar";
import { CiLocationOn } from "react-icons/ci";
import Trending from "../components/Trending";
import ProfilePost from "../components/profilePost";

const Profile = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden ">
      <div className="flex flex-row">
        <div className="w-[10%] md:w-[18%]">
          <Sidebar />
        </div>
        <div className="w-[80%] md:w-[56%]">
          <MidProfile />
        </div>
        <Trending className="w-full md:w-[15%] hidden md:block" />
      </div>
    </div>
  );
};

export default Profile;

const MidProfile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("Posts");
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/create");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://matex.onrender.com/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const userData = response.data.user;
        setUser({
          ...userData,
          profileImage:
            userData.profileImage && userData.profileImage.startsWith("http")
              ? userData.profileImage
              : userData.profileImage
              ? `https://matex.onrender.com/${userData.profileImage}`
              : null,
        });
        setPosts(response.data.posts);
        setLikedPosts(response.data.likedPosts);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="bg-black text-gray-200 border-gray-700 border-b-0 border-l border-t-0 border-r border-[1px]">
      <div className="p-4">
        <div className="flex items-center space-x-4">
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt="Profile"
              className="rounded-full w-24 h-24 object-cover"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-600 rounded-full flex items-center justify-center">
              <span>No Image</span>
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold pl-2">{user.username}</h1>
            <div className="flex space-x-2">
              <span className="text-blue-500 flex flex-col justify-start pl-2">
                <i className="fas fa-check-circle"></i> Get verified
              </span>
            </div>
          </div>
          <div className="flex justify-items-end">
            <button
              onClick={handleCreate}
              className="bg-neutral-800 text-white py-1 px-2 pl-2 rounded-full"
            >
              Edit profile
            </button>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-gray-500 pb-2">{user.email}</p>
          <div className="flex flex-row gap-4 text-gray-500">
            <p className="text-gray-500 gap-2 flex flex-row items-center">
              <CiLocationOn /> {user.location}
            </p>
            <p> Joined December 2023</p>
          </div>
          <p className="text-gray-500 font-serif pt-1">{user.bio}</p>
        </div>
        <div className="mt-4">
          <div className="flex flex-row justify-between space-x-4 border-neutral-600 border-b border-[1px] border-l-0 border-r-0 border-t-0">
            {["Posts", "Replies", "Groups", "Likes"].map((tab) => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative cursor-pointer pb-3"
              >
                <span
                  className={`font-bold text-lg  ${
                    activeTab === tab ? "text-gray-200" : "text-gray-500"
                  }`}
                >
                  {tab}
                </span>

                {activeTab === tab && (
                  <div className="absolute bottom-[-1px] left-0 bg-sky-500 h-[4px] w-full rounded-sm"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          {activeTab === "Posts" && (
            <div>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <div
                    key={post.id}
                    className="w-full divide-neutral-600 divide-y "
                  >
                    <ProfilePost
                      username={user.username}
                      description={post.description}
                      profileImage={user.profileImage}
                      likes={post.likes.length}
                      shares={post.shares.length}
                    />
                  </div>
                ))
              ) : (
                <p>No posts yet.</p>
              )}
            </div>
          )}
          {activeTab === "Replies" && <div>Replies content goes here.</div>}
          {activeTab === "Groups" && <div>Groups content goes here.</div>}
          {activeTab === "Likes" && (
            <div>
              {likedPosts.length > 0 ? (
                likedPosts.map((post) => (
                  <div key={post.id} className=" divide-neutral-600 divide-y">
                    <ProfilePost
                      username={post.createdBy.username}
                      description={post.description}
                      profileImage={post.createdBy.profileImage}
                      likes={post.likes.length}
                      shares={post.shares.length}
                    />
                  </div>
                ))
              ) : (
                <p>No liked posts yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
