import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { firestore } from "../firebase/firebase";

function useLikePost(post) {
  const authUser = useSelector((state) => state.auth.userProfile);
  const [likes, setLikes] = useState(post?.likes?.length);
  const [isLiked, setIsLiked] = useState(post?.likes?.includes(authUser?.uid));

  async function handleLikePost() {
    try {
      const postsRef = doc(firestore, "posts", post.id);
      await updateDoc(postsRef, {
        likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
      });
      if (isLiked) {
        setLikes((prevLikes) => prevLikes - 1);
      } else {
        setLikes((prevLikes) => prevLikes + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.log("Error with like");
    }
  }

  return { handleLikePost, setLikes, isLiked, likes, setIsLiked };
}

export default useLikePost;
