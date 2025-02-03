import React, { useState } from "react";

import { CiHeart } from "react-icons/ci";
import { FiShare } from "react-icons/fi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
const ProfilePost = ({
  description,
  username,
  profileImage,
  shares,
  likes,
}) => {
  const profileImageUrl = profileImage
    ? typeof profileImage === "string" && profileImage.startsWith("http")
      ? profileImage
      : `https://matex.onrender.com/${profileImage}`
    : null;
  return (
    <div className=" bg-black text-white shadow-md rounded-lg p-4 mb-4 hover:bg-neutral-900">
      <div className="text-white flex items-center mb-2">
        {profileImageUrl ? (
          <img
            src={profileImageUrl}
            alt={`${username}'s profile`}
            className="w-8 h-8 rounded-full mr-2"
          />
        ) : (
          <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white">
            <span>A</span>
          </div>
        )}
        <span>{username}</span>
      </div>

      <p className="text-white mb-2">{description}</p>
      <div className="grid grid-cols-4 pt-2 border-t border-b border-r-0 border-l-0 border-[1px] border-neutral-600">
        <div className="likes flex items-center mb-2">
          <button
            className={`flex items-center justify-center w-10 h-10 p-2  
        `}
          >
            <CiHeart className="text-2xl text-pink-600" />
          </button>
          <span className="ml-2">{likes}</span>
        </div>

        <div className="shares flex items-center mb-2">
          <button className="px-1 py-1 text-white hover:rounded-full hover:text-blue-600 hover:bg-sky-200 bg-inherit cursor-pointer  ">
            <div
              style={{
                textOverflow: "unset",
                color: "rgb(113,118,123)",
              }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" class="w-5">
                <g>
                  <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
                </g>
              </svg>
            </div>
          </button>
          <span className="ml-2">{shares}</span>
        </div>

        <div className="flex items-center mb-2">
          <button className="px-1 py-1 text-white hover:rounded-full hover:text-cyan-600 hover:bg-cyan-200">
            <AiOutlineUsergroupAdd className="text-xl" />
          </button>
          <span className="ml-2">{shares}</span>
        </div>

        <div className="hover:text-green-500 flex flex-col justify-center">
          <h3 className="text-md font-semibold mb-1">
            <FaRegComment className="text-xl" />{" "}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ProfilePost;
