import React from "react";
import SuggestedUser from "./SuggestedUser";
import SuggestedUserHeader from "./SuggestedUserHeader";
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";

function SuggestedUsers() {
  const { suggestedUsers } = useGetSuggestedUsers();
  return (
    <div className="flex flex-col text-sm gap-6 px-7 ">
      <SuggestedUserHeader />
      <div className="flex justify-between items-center ">
        <h5 className="text-gray-400">Suggested for you</h5>
        <span className="font-semibold">See All</span>
      </div>
      <div className="flex flex-col gap-6">
        {suggestedUsers.map((user, id) => {
          return <SuggestedUser key={id} user={user} />;
        })}
      </div>
      <div className="text-gray-400">
        © 2024 Built by{" "}
        <a
          className="text-blue-500 text-md"
          href="https://github.com/Stanislav588"
        >
          Stanislav
        </a>
      </div>
    </div>
  );
}

export default SuggestedUsers;
