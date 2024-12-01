import React, { useState } from "react";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";

function FeedPost({ post }) {
  const [isLoading, setIsLoading] = useState(true);
  const { profile } = useGetUserProfileById(post.createdBy);

  return (
    <div className="w-[70%] mx-auto mb-6">
      <PostHeader isLoading={isLoading} createdProfile={profile} />

      <div className="rounded-md overflow-hidden">
        <img className="w-[100%]" src={post?.imageURL} />
      </div>

      <PostFooter createdProfile={profile} post={post} />
    </div>
  );
}

export default FeedPost;
