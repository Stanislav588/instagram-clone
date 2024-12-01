import React from "react";
import FeedPost from "./FeedPost";

import useGetFeedPosts from "../../hooks/useGetFeedPosts";

function FeedPosts() {
  const { posts, showEmptyMessage } = useGetFeedPosts();
  return (
    <div>
      {posts?.length > 0 &&
        posts.map((post) => {
          return <FeedPost key={post.id} post={post} />;
        })}
      {showEmptyMessage && (
        <h1 className=" text-center text-2xl">
          You have to follow some user first to see posts 🥲
        </h1>
      )}
    </div>
  );
}

export default FeedPosts;
