import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import SearchModal from "./SearchModal";

function Search() {
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  return (
    <>
      <Tooltip title={"Search"}>
        <Link
          className=" md:w-[100%] cursor-pointer p-2 rounded-lg hover:bg-zinc-200"
          to={"/"}
        >
          <div
            onClick={() => setIsOpenSearch(true)}
            className="flex gap-4  items-center"
          >
            <IoSearch className="text-3xl" />
            <p className="hidden font-medium md:block">Search</p>
          </div>
        </Link>
      </Tooltip>

      <SearchModal
        isOpenSearch={isOpenSearch}
        setIsOpenSearch={setIsOpenSearch}
      />
    </>
  );
}

export default Search;
