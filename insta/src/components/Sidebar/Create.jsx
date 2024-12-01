import { CircularProgress, Tooltip } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegPlusSquare } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaImage } from "react-icons/fa6";
import useUpdateProfileImg from "../../hooks/useUpdateProfileImg";
import useCreatePost from "../../hooks/useCreatePost";

function Create() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [caption, setCaption] = useState("");
  const ref = useRef(null);
  const { updateImg, handleUpdateImg, setUpdateImg } = useUpdateProfileImg();
  const { handleCreatePost, createPostSuccessfully, setIsLoading, isLoading } =
    useCreatePost();

  async function handleCreatingPost() {
    try {
      await handleCreatePost(updateImg, caption);
      setCaption("");
      setUpdateImg(null);
      setIsOpenModal(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (isOpenModal) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpenModal]);
  return (
    <>
      <Tooltip title={"Create"}>
        <Link
          className=" md:w-[100%] cursor-pointer p-2 rounded-lg hover:bg-zinc-200"
          to={"/"}
        >
          <div
            onClick={() => setIsOpenModal(true)}
            className="flex gap-4  items-center"
          >
            <FaRegPlusSquare className="text-3xl" />
            <p className="hidden font-medium md:block">Create</p>
          </div>
        </Link>
      </Tooltip>
      {isOpenModal && (
        <div
          onClick={() => setIsOpenModal(false)}
          className="fixed z-40 bg-opacity-55 bg-black inset-0"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:w-[90%] md:w-[500px] p-3 rounded-md bg-white block mx-auto mt-20"
          >
            <div className="flex items-center mb-4 justify-between">
              <h1 className="text-xl font-medium">Create post</h1>
              <button
                className="text-2xl"
                onClick={() => setIsOpenModal(false)}
              >
                <IoClose />
              </button>
            </div>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Post caption..."
              className="border min-h-24 rounded-md p-3 border-zinc-400 w-[100%]"
            />

            <input
              onChange={handleUpdateImg}
              ref={ref}
              className="hidden"
              type="file"
            />
            <div className="text-2xl">
              <FaImage
                onClick={() => ref.current.click()}
                className="cursor-pointer"
              />
            </div>
            {updateImg && (
              <div className="my-5 flex relative justify-center">
                <div className="w-[50%]">
                  <img
                    className="w-full h-auto object-cover rounded-lg"
                    src={updateImg}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end">
              {isLoading ? (
                <button className="text-md font-medium bg-zinc-300 px-4 py-1 rounded-md">
                  <CircularProgress size="22px" />
                </button>
              ) : (
                <button
                  onClick={handleCreatingPost}
                  className="text-md font-medium bg-zinc-300 px-4 py-1 rounded-md"
                >
                  Post
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Create;
