import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { firestore, storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";

function useCreatePost() {
  const [createPost, setCreatePost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const authUser = useSelector((state) => state.auth.userProfile);

  async function handleCreatePost(selectedFile, caption) {
    if (!selectedFile) throw new Error(" Please select an image!");

    setIsLoading(true);
    try {
      const newPost = {
        caption: caption,
        comments: [],
        likes: [],
        createdBy: authUser.uid,
        createdAt: Date.now(),
      };
      const postRef = await addDoc(collection(firestore, "posts"), newPost);

      // Update user data with new post ID
      const userRef = doc(firestore, "users", authUser.uid);
      await updateDoc(userRef, { posts: arrayUnion(postRef.id) });

      // Upload image to Firebase Storage
      const imgRef = ref(storage, `posts/${postRef.id}`);
      await uploadString(imgRef, selectedFile, "data_url");

      // Get the image's download URL
      const downloadURL = await getDownloadURL(imgRef);

      // Update Firestore post with image URL
      await updateDoc(postRef, { imageURL: downloadURL });

      // Add the download URL
      newPost.imageURL = downloadURL;
      newPost.id = postRef.id;
      setCreatePost((prev) => [newPost, ...prev]);
      enqueueSnackbar("Post created successfully!", { variant: "success" });
    } catch (error) {
      console.log("Error of creating post");
    } finally {
      setIsLoading(false);
    }
  }
  return {
    handleCreatePost,
    createPost,
    setIsLoading,
    isLoading,
  };
}

export default useCreatePost;
