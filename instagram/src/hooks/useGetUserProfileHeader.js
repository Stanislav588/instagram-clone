import { useEffect, useState } from "react";

import { firestore } from "../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUserProfile } from "../reduxStore/userSlice";

function useGetUserProfileHeader(username) {
  const [userDocs, setUserDocs] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      try {
        const q = query(
          collection(firestore, "users"),
          where("username", "==", username)
        );
        const querySnap = await getDocs(q);
        if (querySnap.empty) {
          dispatch(setUserProfile(null));
          setUserDocs(null);
          return;
        }
        let userDoc;
        querySnap.forEach((doc) => {
          userDoc = doc.data();
        });
        setUserDocs(userDoc);
        dispatch(setUserProfile(userDoc));
      } catch (error) {
        console.log("Error", error.message);
      }
    }
    getData();
  }, [setUserDocs, dispatch, username]);
  return { userDocs };
}

export default useGetUserProfileHeader;
