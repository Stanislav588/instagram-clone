import { Tooltip } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa6";
function Notifications() {
  return (
    <Tooltip title={"Notifications"}>
      <Link
        className=" md:w-[100%] cursor-pointer p-2 rounded-lg hover:bg-zinc-200"
        to={"/"}
      >
        <div className="flex gap-4  items-center">
          <FaRegHeart className="text-3xl" />
          <p className="hidden font-medium md:block">Notifications</p>
        </div>
      </Link>
    </Tooltip>
  );
}

export default Notifications;
