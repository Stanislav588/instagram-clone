import React, { useContext } from "react";
import ProfilePost from "./ProfilePost";
import useGetUsersPosts from "../../hooks/useGetUsersPosts";

function ProfilePosts() {
  const { posts } = useGetUsersPosts();
  const noPostsFound = posts.length === 0;

  if (noPostsFound) {
    return <NoPostsFound />;
  }
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 px-4 mt-8 gap-2 ">
      {posts.map((post) => {
        return <ProfilePost post={post} key={post.id} />;
      })}
    </div>
  );
}

export default ProfilePosts;

export const NoPostsFound = () => {
  return (
    <div className="flex mt-16 justify-center">
      <h1 className="text-3xl text-black">You have no posts ! 🧐</h1>
    </div>
  );
};
