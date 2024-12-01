import { arrayUnion, doc, updateDoc } from "firebase/firestore";

import { useSelector } from "react-redux";
import { firestore } from "../firebase/firebase";
import { useState } from "react";

function usePostComment() {
  const [isLoading, setIsLoading] = useState(false);
  const [addNewComment, setAddNewComment] = useState([]);

  const authUser = useSelector((state) => state.auth.userProfile);
  async function handlePostComment(postId, comment) {
    setIsLoading(true);
    if (!authUser) throw new Error("User is not logged in");
    const newComment = {
      comment: comment,
      createdAt: Date.now(),
      createdBy: authUser.uid,
      postId: postId,
    };
    try {
      await updateDoc(doc(firestore, "posts", postId), {
        comments: arrayUnion(newComment),
      });

      setAddNewComment((prevComment) => [newComment, ...prevComment]);
      setIsLoading(false);
    } catch (error) {
      console.log("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return { handlePostComment, isLoading };
}

export default usePostComment;
