import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { firestore, storage } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "../reduxStore/userSlice";
import { enqueueSnackbar } from "notistack";

function useEditProfile() {
  const dispatch = useDispatch();
  const { fullName, username, bio } = useContext(GlobalContext);
  const userInfo = useSelector((state) => state.auth.userProfile);
  const [isLoading, setIsLoading] = useState(false);
  async function editProfile(selectedFile) {
    const storageRef = ref(storage, `profilePicture/${userInfo.uid}`);
    const userDocRef = doc(firestore, "users", userInfo.uid);

    setIsLoading(true);
    try {
      let URL = "";
      // Here we download choosed img
      if (selectedFile) {
        await uploadString(storageRef, selectedFile, "data_url");

        URL = await getDownloadURL(
          ref(storage, `profilePicture/${userInfo.uid}`)
        );
      }
      const updatedUser = {
        ...userInfo,
        firstName: fullName || userInfo.firstName,
        username: username || userInfo.username,
        bio: bio,
        profilePicture: URL || userInfo.profilePicture,
      };
      await updateDoc(userDocRef, updatedUser);

      localStorage.setItem("user-info", JSON.stringify(updatedUser));
      enqueueSnackbar("You edited your profile successfully", {
        variant: "success",
      });
      dispatch(setUserProfile(updatedUser));
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return { editProfile, setIsLoading, isLoading };
}

export default useEditProfile;
