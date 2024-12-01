import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { firestore } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { setUserProfile } from "../reduxStore/userSlice";

function useFollowUsers(userId) {
  const authUser = useSelector((state) => state.auth.userProfile);
  const dispatch = useDispatch();
  const [isFollowing, setIsFollowing] = useState(null);
  async function handleFollowUser() {
    const currentUser = doc(firestore, "users", authUser.uid);
    const followedUser = doc(firestore, "users", userId);
    try {
      if (isFollowing) {
        await updateDoc(currentUser, {
          following: arrayRemove(userId),
        });
        await updateDoc(followedUser, {
          followers: arrayRemove(authUser.uid),
        });
        //

        const updateFilteredFollowing = {
          ...authUser,
          following: authUser.following.filter((uid) => uid !== userId),
          followers: authUser.followers.filter((uid) => uid !== authUser.uid),
        };

        dispatch(setUserProfile(updateFilteredFollowing));

        localStorage.setItem(
          "user-info",
          JSON.stringify(updateFilteredFollowing)
        );
        setIsFollowing(false);
      } else {
        await updateDoc(currentUser, {
          following: arrayUnion(userId),
        });
        await updateDoc(followedUser, {
          followers: arrayUnion(authUser.uid),
        });

        const updateFollowing = {
          ...authUser,
          following: [...authUser.following, userId],
          followers: [...authUser.followers, authUser.uid],
        };

        dispatch(setUserProfile(updateFollowing));

        localStorage.setItem("user-info", JSON.stringify(updateFollowing));
        setIsFollowing(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    if (authUser?.following) {
      setIsFollowing(authUser.following.includes(userId));
    }
  }, [authUser, userId]);

  return {
    handleFollowUser,
    isFollowing,
  };
}
export default useFollowUsers;
