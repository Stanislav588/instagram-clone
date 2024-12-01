import { Alert, Avatar, CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "../../context/GlobalState";
import useUpdateProfileImg from "../../hooks/useUpdateProfileImg";
import useEditProfile from "../../hooks/useEditProfile";
import { useSelector } from "react-redux";

function EditProfile({ setIsOpenEdit }) {
  const { bio, setBio, fullName, setFullName, setUserName, username } =
    useContext(GlobalContext);
  const authUser = useSelector((state) => state.auth.userProfile);
  const { handleUpdateImg, updateImg } = useUpdateProfileImg();
  const { editProfile, isLoading } = useEditProfile();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  async function handleEditProfile() {
    try {
      await editProfile(updateImg);
      setIsOpenEdit(false);
    } catch (error) {
      console.log("Error", error.message);
    }
  }

  const ref = useRef(null);
  return (
    <>
      <div
        onClick={() => setIsOpenEdit(false)}
        className="inset-0 bg-black   bg-opacity-55 fixed z-50"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-[400px]  block mx-auto translate-y-1/4  p-6  bg-white"
        >
          <h1 className="font-medium  text-3xl">Edit Profile</h1>
          <div className="flex items-center mt-3  gap-7">
            <Avatar
              src={updateImg || authUser?.profilePicture}
              sx={{ width: 75, height: 75 }}
            />
            <button
              onClick={() => ref.current.click()}
              className="bg-blue-400 text-lg text-white border-2 border-gray-400  rounded-lg py-1 px-5"
            >
              Edit user profile
            </button>
            <input
              ref={ref}
              onChange={handleUpdateImg}
              className="hidden"
              type="file"
            />
          </div>
          <form>
            <div className="flex mt-5 flex-col gap-1">
              <label className="font-medium">Full Name</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="rounded-sm h-8 px-2 border border-zinc-400"
                type="text"
                placeholder="Full Name"
              />
            </div>
            <div className="flex mt-2 flex-col gap-1">
              <label className="font-medium">Username</label>
              <input
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                className="rounded-sm h-8 px-2 border border-zinc-400"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="flex mt-2 flex-col gap-1">
              <label className="font-medium">Bio</label>
              <input
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="rounded-sm h-8 px-2 border border-zinc-400"
                type="text"
                placeholder="Bio"
              />
            </div>
          </form>
          <div className="flex mt-3 gap-5 justify-center">
            <button
              onClick={() => setIsOpenEdit(false)}
              className="font-medium rounded-md py-1 px-6 w-[50%] bg-red-400 text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleEditProfile}
              className="font-medium rounded-md py-1 px-6 w-[50%] bg-blue-400 text-white"
            >
              {isLoading ? <CircularProgress size="18px" /> : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
