import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

function Searchbar() {
  return (
    <div className="flex pl-[296px] pr-[295px] py-2.5 bg-[#2c2f48] justify-center items-center inline-center">
      <div className="w-[442px] h-6 relative">
        <div className="w-[442px] h-6 left-0 top-0 absolute bg-gradient-to-b from-[#2e335a] to-[#1c1b33] rounded border-white/20" />
        <div className="h-6 left-[182px] top-0 absolute justify-start items-center gap-1 inline-flex">
          <div className="flex items-center text-white gap-2 text-[13px]">
            <MagnifyingGlassIcon className="w-4 h-4 text-white" />
            <div className="text-[13px]">Explore</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
