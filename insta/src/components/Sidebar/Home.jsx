import React from "react";
import { IoMdHome } from "react-icons/io";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
function Home() {
  return (
    <Tooltip title={"Home"}>
      <Link
        className=" md:w-[100%] cursor-pointer p-2 rounded-lg hover:bg-zinc-200"
        to={"/"}
      >
        <div className="flex gap-4  items-center">
          <IoMdHome className="text-3xl" />
          <p className="hidden font-medium md:block">Home</p>
        </div>
      </Link>
    </Tooltip>
  );
}

export default Home;
