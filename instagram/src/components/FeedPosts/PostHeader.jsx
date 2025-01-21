import React from "react";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import useFollowUsers from "../../hooks/useFollowUsers";
import moment from "moment";
function PostHeader({ createdProfile }) {
  const { createdAt } = createdProfile;
  const timeAgo = moment(createdAt).fromNow();
  const { isFollowing, handleFollowUser } = useFollowUsers(createdProfile?.uid);
  return (
    <div className="flex items-center justify-between flex-wrap text-sm mb-2">
      <div className="flex items-center gap-2">
        <Link className="cursor-pointer" to={`/${createdProfile.username}`}>
          <Avatar alt="Remy Sharp" src={createdProfile?.profilePicture} />
        </Link>
        <Link className="cursor-pointer" to={`/${createdProfile.username}`}>
          <p>{createdProfile?.username}</p>
        </Link>

        <div className="ml-3 text-gray-400">{timeAgo}</div>
      </div>
      <div>
        <button onClick={handleFollowUser} className="text-blue-500   text-md">
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      </div>
    </div>
  );
}

export default PostHeader;
