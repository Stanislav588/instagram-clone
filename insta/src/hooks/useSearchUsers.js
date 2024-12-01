import React, { useState } from "react";

import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

function useSearchUsers() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  async function searchUsersByUserName(username) {
    setIsLoading(true);
    try {
      const q = query(
        collection(firestore, "users"),
        where("username", "==", username)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError(true);
        return;
      }

      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
      setIsLoading(false);
      setError(false);
    } catch (error) {
      console.log("User doesnt exist", error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return { searchUsersByUserName, isLoading, error, user };
}

export default useSearchUsers;
