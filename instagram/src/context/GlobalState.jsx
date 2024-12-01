import { createContext, useState } from "react";
import { auth, firestore } from "../firebase/firebase";
import { doc, getDocs, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "../reduxStore/userSlice";
import { getDoc } from "firebase/firestore";
import { collection, query, where } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { enqueueSnackbar } from "notistack";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

  const [deletedPostSuccessfully, setDeletedPostSuccessfully] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUserName] = useState("");
  const [bio, setBio] = useState("");

  // Creating of new user
  async function signUp(e) {
    e.preventDefault();
    // Checks if there is the user with the same username
    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnap = await getDocs(q);

    if (!querySnap.empty) {
      enqueueSnackbar("User with this name is allready exist", {
        variant: "error",
      });

      return;
    }

    // ================

    if ((!email || !fullName, !password || !username)) {
      enqueueSnackbar("Please fill all the fields", {
        variant: "warning",
      });
      return;
    }
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (user) {
        const newUser = {
          email: email,
          firstName: fullName,
          username: username,
          uid: user.uid,
          bio: "",
          followers: [],
          following: [],
          posts: [],
          profilePicture: "",
          createdAt: Date.now(),
        };
        await setDoc(doc(firestore, "users", user.uid), newUser);
        localStorage.setItem("user-info", JSON.stringify(newUser));
        enqueueSnackbar("User created successfully!", { variant: "success" });
        dispatch(setUserProfile(newUser));
        setIsLoading(false);
        setEmail("");
        setFullName("");
        setPassword("");
        setUserName("");
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("User with this email is allready exist", {
        variant: "warning",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // ===========

  // Login of new user

  async function logIn(e) {
    e.preventDefault();

    if (!email || !password) {
      enqueueSnackbar("Please fill all the fields", {
        variant: "warning",
      });
      return;
    }
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(firestore, "users", user.uid);
        const docSnap = await getDoc(docRef);
        localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
        dispatch(setUserProfile(docSnap.data()));
        enqueueSnackbar("You Signed in successfully!", { variant: "success" });
        setIsLoading(false);
        setEmail("");
        setFullName("");
        setPassword("");
        setUserName("");
      }
    } catch (error) {
      enqueueSnackbar("User doesn't exist", {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        signUp,
        email,
        bio,
        setBio,
        setFullName,
        isLoading,
        setEmail,
        setPassword,
        setFullName,
        setUserName,
        error,
        deletedPostSuccessfully,
        setDeletedPostSuccessfully,
        setError,
        password,
        fullName,
        username,
        logIn,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
