import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";

function GoogleAuth({ isLogin }) {
  return (
    <div className="flex mt-4 justify-center gap-3">
      <img className="w-[30px] " src="../../src/img/google-auth.png" alt="" />
      <a
        href="#!"
        className="text-blue-500 flex justify-center mt-2 cursor-pointer"
      >
        {isLogin ? "Login in" : "Sign in"} with Google
      </a>
    </div>
  );
}

export default GoogleAuth;
