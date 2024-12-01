import React, { useContext, useEffect } from "react";
import FeedPosts from "./FeedPosts/FeedPosts";
import SuggestedUsers from "./SuggestedUsers/SuggestedUsers";

function HomePage() {
  return (
    <>
      <div className="flex gap-12 mt-10">
        <div className=" text-white w-[100%]">
          <FeedPosts />
        </div>

        <div className="hidden md:block lg:block lg:w-2/6 text-white">
          <SuggestedUsers />
        </div>
      </div>
    </>
  );
}

export default HomePage;
