import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { setOtherProfiles } from "../reduxStore/userSlice";

function useGetSuggestedUsers() {
  const dispatch = useDispatch();
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const authUser = useSelector((state) => state.auth.userProfile);

  useEffect(() => {
    async function getSuggestedUsers() {
      try {
        const usersRef = collection(firestore, "users");
        const q = query(
          usersRef,
          where("uid", "not-in", [authUser.uid, ...authUser.following]),
          orderBy("uid"),
          limit(3)
        );

        const querySnaphot = await getDocs(q);

        const users = [];

        querySnaphot.forEach((doc) => {
          users.push({ ...doc.data(), id: doc.id });
        });
        setSuggestedUsers(users);

        dispatch(setOtherProfiles(users));
      } catch (error) {
        console.log("Suggested users error", error.message);
      } finally {
      }
    }

    if (authUser) getSuggestedUsers();
  }, [authUser]);
  return { suggestedUsers };
}

export default useGetSuggestedUsers;
