import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import useLikePost from "../../hooks/useLikePost";
import usePostComment from "../../hooks/usePostComment";

import { CircularProgress } from "@mui/material";
import CommentsModal from "../Comment/CommentsModal";

function PostFooter({ post }) {
  const { isLiked, likes, handleLikePost } = useLikePost(post);
  const [isOpenComments, setIsOpenComments] = useState(false);
  const [comment, setComment] = useState("");
  const { handlePostComment, isLoading } = usePostComment();

  async function handleCreatingComments() {
    await handlePostComment(post.id, comment);
    if (comment.trim() === "") {
      return;
    }
    setComment("");
  }

  return (
    <>
      <div className="flex mt-2">
        <div className="flex items-center gap-5">
          <div onClick={handleLikePost}>
            {isLiked ? (
              <FaHeart className="text-2xl cursor-pointer text-red-500" />
            ) : (
              <FaRegHeart className="text-2xl cursor-pointer" />
            )}
          </div>
          <FaRegComment className="text-2xl  cursor-pointer" />
        </div>
      </div>
      <div className="flex flex-col mb-2 ">
        <div className="flex mt-1 gap-1 ">
          <span>{likes}</span>
          <p className="select-none">{likes === 1 ? "like" : "likes"}</p>
        </div>
        <div className="flex gap-1">
          <p>{post?.caption}</p>
        </div>
        <p
          onClick={() => setIsOpenComments(true)}
          className="text-gray-500 cursor-pointer"
        >
          View all {post?.comments?.length} comments
        </p>
        {isOpenComments && (
          <CommentsModal post={post} setIsOpenComments={setIsOpenComments} />
        )}
      </div>
      <div className="flex">
        <input
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          placeholder="Add a comment..."
          type="text"
          className="w-[100%] transition-all px-1 border-b placeholder:opacity-35 py-2 bg-transparent outline-none focus:border-gray-100  border-b-gray-600 bg-none"
        />
        <button
          onClick={handleCreatingComments}
          className="text-blue-500 text-sm"
        >
          {isLoading ? <CircularProgress size="18px" /> : "Post"}
        </button>
      </div>
    </>
  );
}

export default PostFooter;
