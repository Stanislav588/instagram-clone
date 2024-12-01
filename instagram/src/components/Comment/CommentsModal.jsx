import { Avatar } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function CommentsModal({ post, setIsOpenComments }) {
  const authUser = useSelector((state) => state.auth.userProfile);
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div
      onClick={() => setIsOpenComments(false)}
      className="inset-0 bg-black   bg-opacity-55 fixed z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=" sm:w-[90%] md:w-[90%] lg:w-[470px] rounded-md  block mx-auto translate-y-1/4  p-6  bg-white"
      >
        <h1 className="font-medium  text-3xl">Comments</h1>
        <div className="mt-7">
          {post.comments.length === 0 && (
            <h1 className="text-black text-2xl">
              This user doesn't have any comments 😕
            </h1>
          )}
          {post.comments.map((post, id) => {
            return (
              <div className="mb-3 max-h-60 overflow-y-auto " key={id}>
                <div className="flex items-center gap-3">
                  <Avatar src={authUser?.profilePicture} />
                  <p>{post?.comment}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CommentsModal;
