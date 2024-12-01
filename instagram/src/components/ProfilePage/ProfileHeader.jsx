import React, { useContext, useEffect, useState } from "react";
import { Alert, Avatar } from "@mui/material";
import EditProfile from "./EditProfile";
import useFollowUsers from "../../hooks/useFollowUsers";
import { GlobalContext } from "../../context/GlobalState";
import useGetUsersPosts from "../../hooks/useGetUsersPosts";
import { useSelector } from "react-redux";

function ProfileHeader({ userDocs }) {
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const { posts } = useGetUsersPosts();
  const userProfile = useSelector((state) => state.auth.userProfile);

  const { handleFollowUser, isFollowing } = useFollowUsers(userDocs?.uid);
  const { setShowSuccess, showSuccess } = useContext(GlobalContext);
  const isMyProfile = userProfile?.username === userDocs?.username;
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [showSuccess]);
  return (
    <>
      {showSuccess && (
        <div className="block mx-auto w-[25%] ">
          <Alert className=" top-4 right-0 absolute  " severity="success">
            User profile updated successfully!
          </Alert>
        </div>
      )}

      <div className="flex items-center flex-col sm:flex-col md:flex-row py-10 md:py-10 lg:py-20  gap-10 ">
        <Avatar
          alt="Remy Sharp"
          src={userProfile?.profilePicture}
          sx={{ width: 106, height: 106 }}
        />
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <h2>{userProfile?.username}</h2>

            {isMyProfile && (
              <button
                onClick={() => setIsOpenEdit(true)}
                className="bg-black py-2 px-4 rounded-lg text-white"
              >
                Edit Profile
              </button>
            )}
            {!isMyProfile && (
              <button onClick={handleFollowUser}>
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>
          {isOpenEdit && <EditProfile setIsOpenEdit={setIsOpenEdit} />}
          <div className="flex gap-4 items-center">
            <p>
              <span className="pr-1 font-semibold">{posts?.length}</span>
              {posts?.length > 1 ? "Posts" : "Post"}
            </p>
            <p>
              <span className="pr-1 font-semibold">
                {userDocs?.followers?.length}
              </span>
              Followers
            </p>
            <p>
              <span className="pr-1 font-semibold">
                {userDocs?.following?.length}
              </span>
              Following
            </p>
          </div>

          <h3 className="font-semibold">As a programmer</h3>
          <p>{userProfile?.bio}</p>
        </div>
      </div>
    </>
  );
}

export default ProfileHeader;
