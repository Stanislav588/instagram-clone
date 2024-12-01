import { Tooltip } from "@mui/material";
import React from "react";
import { TbLogout2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useLogOut } from "../../hooks/useLogOut";

function LogOut() {
  const { handleLogOut } = useLogOut();
  return (
    <Tooltip title={"Log Out"}>
      <Link
        className=" md:w-[100%] cursor-pointer p-2 rounded-lg hover:bg-zinc-200"
        to={"/"}
      >
        <div onClick={handleLogOut} className="flex gap-4  items-center">
          <TbLogout2 className="text-3xl" />
          <p className="hidden font-medium md:block">Log Out</p>
        </div>
      </Link>
    </Tooltip>
  );
}

export default LogOut;
