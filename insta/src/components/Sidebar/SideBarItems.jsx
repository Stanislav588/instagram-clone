import React from "react";
import Home from "./Home";
import Search from "./Search";
import Notifications from "./Notifications";
import Create from "./Create";
import Profile from "./Profile";
import LogOut from "./LogOut";

function SideBarItems() {
  return (
    <div className="flex flex-col gap-5 items-center mt-6">
      <Home />
      <Search />
      <Notifications />
      <Create />
      <Profile />
      <LogOut />
    </div>
  );
}

export default SideBarItems;
