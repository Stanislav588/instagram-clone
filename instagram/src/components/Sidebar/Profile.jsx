import { Avatar, Tooltip } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Profile() {
  const authUser = useSelector((state) => state.auth.userProfile);
  return (
    <Tooltip title={"Profile"}>
      <Link
        className=" md:w-[100%] cursor-pointer p-2 rounded-lg hover:bg-zinc-200"
        to={`${authUser?.username}`}
      >
        <div className="flex gap-4  items-center">
          <Avatar src={authUser?.profilePicture} />

          <p className="hidden font-medium md:block">Profile</p>
        </div>
      </Link>
    </Tooltip>
  );
}

export default Profile;
