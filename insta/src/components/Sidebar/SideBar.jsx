import React from "react";
import instagramLogo from "../../img/logo-inst.png";

import { Link } from "react-router-dom";

import { FaInstagram } from "react-icons/fa";

import SideBarItems from "./SideBarItems";

function SideBar() {
  return (
    <div className=" md:w-[320px] py-10 px-7  border-r border-gray-100">
      <div className="flex flex-col">
        <Link className="cursor-pointer hidden md:block sm:none" to="/">
          <img width={200} src={instagramLogo} />
        </Link>

        <Link className="sm:block mx-auto md:hidden text-3xl " to="/">
          <FaInstagram />
        </Link>

        <SideBarItems />
      </div>
    </div>
  );
}

export default SideBar;
