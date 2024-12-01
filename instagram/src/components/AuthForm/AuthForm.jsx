import React, { useState } from "react";
import instagramLogo from "../../img/logo.png";
import authImg from "../../img/auth.png";
import appStoreImg from "../../img/app-store.png";
import googlePlay from "../../img/google.png";
import Login from "./Login";

import SignUp from "./SignUp";
import GoogleAuth from "./GoogleAuth";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="flex gap-5 bg-white text-black justify-center mt-[100px] items-center">
      <div>
        <img className="w-[100%]" src={authImg} />
      </div>
      <div>
        <div className="border  border-gray-300 py-3 px-6">
          <img width={300} src={instagramLogo} />
          <div>
            <div className="flex flex-col gap-2 mt-5 mb-4">
              {isLogin ? <Login /> : <SignUp />}
            </div>
          </div>

          <div className="flex  mt-4 items-center gap-4">
            <div className="border-b border-gray-300 w-[50%]"></div>
            <h2 className="text-gray-500">OR</h2>
            <div className="border-b border-gray-300  w-[50%]"></div>
          </div>
          <GoogleAuth isLogin={isLogin} />
        </div>

        <div className="border border-gray-300 mt-3">
          <div className="flex items-center gap-2 justify-center py-5">
            {isLogin ? (
              <p>Don't have an account?</p>
            ) : (
              <p>Allready have an account?</p>
            )}

            <span
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-500 cursor-pointer font-medium"
            >
              {isLogin ? "Sign Up" : "Log in"}
            </span>
          </div>
        </div>

        <p className="text-center my-6">Get the app</p>

        <div className="flex justify-center gap-5">
          <img width={180} src={appStoreImg} alt="app-store" />
          <img width={180} src={googlePlay} alt="google-play" />
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
