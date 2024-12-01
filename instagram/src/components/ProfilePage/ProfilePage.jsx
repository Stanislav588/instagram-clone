import React, { useContext, useEffect } from "react";
import ProfilePosts from "./ProfilePosts";
import ProfileHeader from "./ProfileHeader";
import { FaRegHeart } from "react-icons/fa6";
import { MdOutlineSaveAlt, MdPostAdd } from "react-icons/md";
import { useParams } from "react-router-dom";

import useGetUserProfileHeader from "../../hooks/useGetUserProfileHeader";
import { GlobalContext } from "../../context/GlobalState";
import { Alert } from "@mui/material";

function ProfilePage() {
  const { username } = useParams();
  const { userDocs } = useGetUserProfileHeader(username);
  const { deletedPostSuccessfully, setDeletedPostSuccessfully } =
    useContext(GlobalContext);
  const userNotFound = !userDocs;
  if (userNotFound) {
    alert("User not found!");
  }
  useEffect(() => {
    if (deletedPostSuccessfully) {
      const timer = setTimeout(() => {
        setDeletedPostSuccessfully(false);
      }, 3000);

      return () => clearInterval(timer);
    }
  }, [deletedPostSuccessfully]);

  return (
    <>
      {deletedPostSuccessfully && (
        <div className="block  mx-auto w-[25%] ">
          <Alert className=" z-50 top-4 right-0 absolute  " severity="success">
            Post deleted successfully!
          </Alert>
        </div>
      )}
      <div className="w-[100%] px-0 lg:px-28 flex flex-col  ">
        <div className="border-b-2 border-b-[100%] border-gray-200 w-[100%] mx-auto">
          {userDocs && <ProfileHeader userDocs={userDocs} />}
        </div>
        <div className="flex justify-center gap-10 lg:gap-14 items-center">
          <div className="flex items-center gap-1">
            <div className="text-3xl">
              <MdPostAdd />
            </div>
            <p className="font-semibold hidden lg:block cursor-pointer">
              POSTS
            </p>
          </div>
          <div className="flex items-center gap-1">
            <div className="text-3xl">
              <MdOutlineSaveAlt />
            </div>
            <p className="font-semibold hidden lg:block cursor-pointer">
              SAVED
            </p>
          </div>
          <div className="flex items-center gap-1">
            <div className="text-2xl">
              <FaRegHeart />
            </div>
            <p className="font-semibold hidden lg:block cursor-pointer">
              LIKES
            </p>
          </div>
        </div>
        <div>
          <ProfilePosts />
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
