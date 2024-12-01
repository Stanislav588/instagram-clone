import React, { useContext, useEffect } from "react";

import { Alert, Avatar } from "@mui/material";
import { Link } from "react-router-dom";

import { useLogOut } from "../../hooks/useLogOut";
import { useSelector } from "react-redux";
import { GlobalContext } from "../../context/GlobalState";

function SuggestedUserHeader() {
  const { postCreatedSuccessfully, setPostCreatedSuccessfully } =
    useContext(GlobalContext);

  useEffect(() => {
    if (postCreatedSuccessfully) {
      const timer = setTimeout(() => {
        setPostCreatedSuccessfully(false);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [postCreatedSuccessfully]);
  const authUser = useSelector((state) => state.auth.userProfile);
  const { handleLogOut } = useLogOut();

  return (
    <>
      {postCreatedSuccessfully && (
        <Alert className=" z-50 top-4 right-0 absolute" severity="success">
          Post created successfully!
        </Alert>
      )}
      <div className="flex gap-5 justify-between items-center">
        <Link to={`${authUser.username}`}>
          <Avatar
            className="w-[100%]"
            src={authUser.profilePicture}
            alt="profilePicture"
          />
        </Link>
        <Link to={authUser.username}>
          <p className="text-black cursor-pointer">{authUser.username}</p>
        </Link>
        <Link to="/auth">
          <button onClick={handleLogOut} className="text-blue-500 w-[100%]">
            Log out
          </button>
        </Link>
      </div>
    </>
  );
}

export default SuggestedUserHeader;
