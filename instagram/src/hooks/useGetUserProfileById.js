import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase";

function useGetUserProfileById(userId) {
  const [profile, setUserProfile] = useState([]);
  useEffect(() => {
    async function getUserInfoById() {
      try {
        const userRef = doc(firestore, "users", userId);
        const getUser = await getDoc(userRef);
        if (getUser.exists()) {
          setUserProfile(getUser.data());
        }
      } catch (error) {
        console.log("Error with getting User info");
      }
    }
    getUserInfoById();
  }, [userId]);

  return { profile };
}

export default useGetUserProfileById;
