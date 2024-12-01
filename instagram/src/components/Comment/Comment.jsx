import { Avatar } from "@mui/material";
import React from "react";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";

function Comment({ newComment }) {
  const { profile } = useGetUserProfileById(newComment.createdBy);
  return (
    <div className="flex gap-4">
      <Avatar src={profile?.profilePicture} />
      <div className="flex flex-col">
        <p>{profile?.username}</p>
        <span className="text-gray-400">1d ago</span>
      </div>
      <p>{newComment.comment}</p>
    </div>
  );
}

export default Comment;
