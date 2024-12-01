import { useDispatch } from "react-redux";
import { auth } from "../firebase/firebase";
import { logOut } from "../reduxStore/userSlice";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { enqueueSnackbar } from "notistack";
export const useLogOut = () => {
  const dispatch = useDispatch();
  const { setError } = useContext(GlobalContext);
  async function handleLogOut() {
    try {
      await auth.signOut();
      localStorage.removeItem("user-info");
      dispatch(logOut());
      setError(false);
      enqueueSnackbar("Log out successfully", {
        variant: "success",
      });
    } catch (error) {
      alert("Error", error.message);
    }
  }

  return {
    handleLogOut,
  };
};
