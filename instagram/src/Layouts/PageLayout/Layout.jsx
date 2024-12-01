import React from "react";
import { useLocation } from "react-router-dom";
import SideBar from "../../components/Sidebar/SideBar";

function Layout({ children }) {
  const { pathname } = useLocation();
  return (
    <div className="flex">
      {pathname === "/auth" ? null : <SideBar />}

      <div className="w-[100%]">{children}</div>
    </div>
  );
}

export default Layout;
