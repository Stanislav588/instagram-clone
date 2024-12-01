import { auth, firestore } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUserProfile } from "../reduxStore/userSlice";
import { enqueueSnackbar } from "notistack";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

function useSignWithGoogle() {
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  const dispatch = useDispatch();
  async function handleSignInWithGoogle() {
    try {
      const userCredential = await signInWithGoogle();
      const user = userCredential.user;
      if (user) {
        const userData = {
          email: user.email,
          firstName: user.displayName,
          username: user.email.split("@")[0],
          uid: user.uid,
          bio: "",
          followers: [],
          following: [],
          posts: [],
          profilePicture: user.photoURL,
          createdAt: Date.now(),
        };
        await setDoc(doc(firestore, "users", user.uid), userData);
        localStorage.setItem("user-info", JSON.stringify(userData));
        dispatch(setUserProfile(userData));
        enqueueSnackbar("Signed up successfully!", { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar("Something went wrong!", { variant: "error" });
    }
  }

  return { handleSignInWithGoogle };
}

export default useSignWithGoogle;
