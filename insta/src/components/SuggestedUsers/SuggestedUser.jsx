import React from "react";

import { Avatar } from "@mui/material";
import useFollowUsers from "../../hooks/useFollowUsers";
import { Link } from "react-router-dom";

function SuggestedUser({ user }) {
  const { handleFollowUser, isFollowing } = useFollowUsers(user.uid);

  return (
    <div className="flex justify-between  text-black items-center">
      <div className="flex items-center gap-3">
        <Link to={`${user?.username}`}>
          <Avatar
            className="w-[100%] cursor-pointer"
            src={user?.profilePicture}
          />
        </Link>
        <div className="flex flex-col gap-2">
          <h3 className="text-md cursor-pointer  font-semibold">
            {user?.username}
          </h3>

          <p className="text-gray-500">
            {user?.followers.length}{" "}
            {user?.followers.length === 1 ? "follower" : "followers"}
          </p>
        </div>
      </div>

      <a onClick={handleFollowUser} href="#!" className="text-blue-500">
        {isFollowing ? "Unfollow" : "Follow"}
      </a>
    </div>
  );
}

export default SuggestedUser;
