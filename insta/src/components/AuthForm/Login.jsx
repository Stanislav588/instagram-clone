import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { CircularProgress } from "@mui/material";
function Login() {
  const {
    email,
    setIsLoading,
    isLoading,
    setPassword,
    setEmail,
    password,
    logIn,
  } = useContext(GlobalContext);
  return (
    <>
      <form onSubmit={logIn} className="flex gap-2 flex-col">
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="bg-gray-100 py-2 border rounded-sm px-2 border-gray-300 "
          placeholder="Phone number, username, or email"
          type="email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="bg-gray-100 py-2 border rounded-sm px-2 border-gray-300 "
          type="password"
          placeholder="Password"
        />
        <button
          disabled={isLoading}
          className={`px-7 py-2  rounded-lg w-[100%] text-white  bg-blue-500 ${
            isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {isLoading ? <CircularProgress size="19px" /> : "Log in"}
        </button>
      </form>
    </>
  );
}

export default Login;
