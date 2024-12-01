import { Avatar, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaTrash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Comment from "../Comment/Comment";
import { FaRegComment } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../../firebase/firebase";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";

import { deletePost } from "../../reduxStore/userSlice";
import usePostComment from "../../hooks/usePostComment";
import useLikePost from "../../hooks/useLikePost";
import { enqueueSnackbar } from "notistack";

function Modal({ setIsOpenModal, post }) {
  const [comment, setComment] = useState("");
  const authUser = useSelector((state) => state.auth.userProfile);
  const dispatch = useDispatch();

  const { handlePostComment, isLoading } = usePostComment();

  async function handlePostingComments() {
    await handlePostComment(post.id, comment);
    setComment("");
  }

  const { handleLikePost, likes, isLiked } = useLikePost(post);

  async function handleDeletePost() {
    if (!window.confirm("Are you sure you want to delete this post ?")) return;

    try {
      const imageRef = ref(storage, `posts/${post.id}`);
      const userRef = doc(firestore, "users", authUser.uid);
      const postRef = doc(firestore, "posts", post.id);
      await deleteObject(imageRef);
      await deleteDoc(postRef);
      await updateDoc(userRef, {
        posts: arrayRemove(post.id),
      });

      dispatch(deletePost(post.id));
      setIsOpenModal(false);
      enqueueSnackbar("Post deleted successfully!", { variant: "success" });
    } catch (error) {
      console.log("Error with deleting the post", error.message);
    }
  }

  useEffect(() => {
    // Disable scroll when the modal is open
    document.body.style.overflow = "hidden";
    return () => {
      // Enable scroll when the modal is closed
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div
      onClick={() => setIsOpenModal(false)}
      className="fixed inset-0 z-30 bg-black bg-opacity-55 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-container relative bg-white rounded-md shadow-lg overflow-hidden lg:w-[1200px] sm:max-w-[90%] sm:w-[100%] max-h-[90vh] flex"
      >
        <div className="flex gap-7">
          <div className="w-full">
            <img
              className=" w-[100%] object-cover"
              src={post.imageURL}
              alt="Post"
            />
          </div>

          <div className="lg:flex hidden flex-col py-4 pr-2 w-[100%]">
            <div className="flex justify-between items-center border-b pb-3 border-b-gray-400">
              <div className="flex gap-4 items-center">
                <Avatar src={authUser.profilePicture} />
                <p>{authUser.username}</p>
              </div>
              <div className="flex gap-4">
                <FaTrash
                  onClick={handleDeletePost}
                  className="cursor-pointer"
                />
                <IoClose
                  onClick={() => setIsOpenModal(false)}
                  className="text-xl cursor-pointer"
                />
              </div>
            </div>

            <div className="mt-5 max-h-60 overflow-y-auto gap-3">
              {post?.caption && (
                <div className="flex gap-4">
                  <Avatar src={authUser?.profilePicture} />
                  <div className="flex flex-col">
                    <p className="font-medium">{authUser?.username} :</p>
                    <span className="text-gray-400">1d ago</span>
                  </div>
                  <p>{post?.caption}</p>
                </div>
              )}

              {post.comments.map((newComment) => {
                return (
                  <Comment key={newComment.createdAt} newComment={newComment} />
                );
              })}
            </div>
            <div className="mt-auto flex flex-col justify-start mb-3">
              <div className="flex mb-2 text-2xl gap-4">
                <div onClick={handleLikePost}>
                  {isLiked ? (
                    <FaHeart className="cursor-pointer  text-red-500" />
                  ) : (
                    <FaRegHeart className="cursor-pointer" />
                  )}
                </div>
                <FaRegComment className="cursor-pointer" />
              </div>
              <p>
                {likes}
                {likes === 1 ? " like" : " likes"}
              </p>
              <p className="font-medium">Feeling good</p>
              <span className="text-gray-400">
                View all {post?.comments?.length}{" "}
                {post?.comments?.length === 1 ? "comment" : "comments"}
              </span>
            </div>

            <div className="flex justify-between border-b border-b-gray-400 pb-2">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                type="text"
                placeholder="Add a comment..."
                className="border-none w-[100%] px-3 outline-none bg-transparent"
              />
              <a
                onClick={handlePostingComments}
                className="text-blue-400 mr-3"
                href="#!"
              >
                {isLoading ? <CircularProgress size="19px" /> : "Post"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
