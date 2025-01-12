import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

function useGetUsersPosts() {
  const [posts, setLocalPosts] = useState([]);
  const authProfile = useSelector((state) => state.auth.userProfile);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!authProfile) {
      setLocalPosts([]);
      return;
    }
    async function getUsersPosts() {
      try {
        const q = query(
          collection(firestore, "posts"),
          where("createdBy", "==", authProfile.uid)
        );

        const querySnap = await getDocs(q);
        const posts = [];

        querySnap.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id });
        });

        const sortedPosts = posts.sort((a, b) => b.createdAt - a.createdAt);

        setLocalPosts(sortedPosts);
      } catch (error) {
        console.log("error of getting posts", error.message);
      }
    }
    getUsersPosts();
  }, [authProfile]);
  return { posts };
}

export default useGetUsersPosts;
