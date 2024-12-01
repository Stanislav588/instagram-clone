import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { CircularProgress } from "@mui/material";

function SignUp() {
  const {
    email,
    username,
    setEmail,
    setPassword,
    setFullName,
    setUserName,
    fullName,
    isLoading,
    password,
    signUp,
  } = useContext(GlobalContext);

  return (
    <>
      <form onSubmit={signUp} className="flex flex-col  gap-2">
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="bg-gray-100 py-2 outline-none border rounded-sm px-2 border-gray-300 "
          placeholder="Phone number, username, or email"
          type="email"
        />

        <input
          onChange={(e) => setUserName(e.target.value)}
          value={username}
          className="bg-gray-100 outline-none py-2 border rounded-sm px-2 border-gray-300 "
          placeholder="Username"
          type="text"
        />

        <input
          onChange={(e) => setFullName(e.target.value)}
          value={fullName}
          className="bg-gray-100 outline-none py-2 border rounded-sm px-2 border-gray-300 "
          placeholder="Full Name"
          type="text"
        />

        <div className="bg-gray-100 flex justify-between py-2 border rounded-sm px-2 border-gray-300 ">
          <input
            className="border-none outline-none bg-transparent"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
          />
          <button>Hide</button>
        </div>

        <div>
          <button
            disabled={isLoading}
            className={`px-7 py-2  rounded-lg w-[100%] text-white  bg-blue-500 ${
              isLoading ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            {isLoading ? <CircularProgress size="19px" /> : "Sign up"}
          </button>
        </div>
      </form>
    </>
  );
}

export default SignUp;
