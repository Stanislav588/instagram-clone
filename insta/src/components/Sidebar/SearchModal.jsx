import React, { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import useSearchUsers from "../../hooks/useSearchUsers";
import { Alert, CircularProgress } from "@mui/material";
import SuggestedUser from "../SuggestedUsers/SuggestedUser";
function SearchModal({ isOpenSearch, setIsOpenSearch }) {
  const { searchUsersByUserName, isLoading, error, user } = useSearchUsers();

  const ref = useRef(null);
  function handleSearchUsers(e) {
    e.preventDefault();
    searchUsersByUserName(ref.current.value);
    ref.current.value = "";
  }
  useEffect(() => {
    if (isOpenSearch) {
      // Disable scroll when the modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      // Enable scroll when the modal is closed
      document.body.style.overflow = "auto";
    };
  }, [isOpenSearch]);
  return (
    <>
      {isOpenSearch && (
        <div
          onClick={() => setIsOpenSearch(false)}
          className="inset-0 absolute z-40 bg-black bg-opacity-55"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className=" lg:w-[450px] sm:w-[80%] md:w-[80%] block mx-auto mt-20 rounded-md  bg-white pt-5 pb-9  px-5"
          >
            <div className="flex justify-between items-center">
              <h1 className="font-medium text-2xl">Search user</h1>
              <button
                className="text-2xl"
                onClick={() => setIsOpenSearch(false)}
              >
                <IoClose />
              </button>
            </div>
            <form className="mt-4">
              <div className="block">
                <p>Username</p>
                <input
                  ref={ref}
                  className=" w-[100%] mt-1 rounded-md border border-zinc-400 px-2 h-8"
                  placeholder="username"
                />
              </div>
              <div className="flex mt-2 mb-4  justify-end">
                <button
                  onClick={handleSearchUsers}
                  className=" w-100% bg-zinc-300 px-4 rounded-md py-1 text-md font-medium"
                >
                  {isLoading ? <CircularProgress size="18px" /> : "Search"}
                </button>
              </div>
              {error ? (
                <Alert
                  className="mb-4 block mx-auto bg-red-500"
                  severity="error"
                  sx={{ width: "50%" }}
                >
                  User is not found!
                </Alert>
              ) : null}
            </form>

            {user && <SuggestedUser user={user} />}
          </div>
        </div>
      )}
    </>
  );
}

export default SearchModal;
