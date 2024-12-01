import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { firestore } from "../firebase/firebase";

import { setUserProfile } from "../reduxStore/userSlice";

function useGetFeedPosts() {
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);
  const [posts, setPosts] = useState(null);
  const authUser = useSelector((state) => state.auth.userProfile);

  useEffect(() => {
    async function getFeedPosts() {
      if (!authUser || !authUser.following || authUser.following.length === 0) {
        setShowEmptyMessage(true);
        setPosts([]); // No posts to fetch
        return;
      }
      setShowEmptyMessage(false);
      const q = query(
        collection(firestore, "posts"),
        where("createdBy", "in", authUser.following)
      );

      try {
        const querySnapshot = await getDocs(q);
        const feedPosts = [];

        querySnapshot.forEach((doc) => {
          feedPosts.push({ id: doc.id, ...doc.data() });
        });
        setPosts(feedPosts);
        feedPosts.sort((a, b) => b.createdAt - a.createdAt);
      } catch (error) {
        console.log("Error with fetching Feed posts", error.message);
      }
    }
    if (authUser) getFeedPosts();
  }, [authUser, setPosts, setUserProfile]);

  return { posts, showEmptyMessage };
}

export default useGetFeedPosts;
