"use client";
import React from "react";
import { useRouter } from 'next/navigation';

function SidebarItem({ icon, text, isActive }) {
  const router = useRouter();
  var path = '/' + text

  const handleClick = () => {
    router.push(path.toLowerCase());
  }

  return (
    <div
      className={`flex overflow-hidden flex-col justify-center items-start py-2 w-full rounded-md hover:bg-white hover:bg-opacity-50 ${
        isActive ? "bg-black bg-opacity-50" : ""
      } max-w-[212px]`}
    >
      <div className="flex gap-2 items-center pl-2">
        {typeof icon === "string" ? (
          <div className="self-stretch p-1 my-auto w-6 text-sm font-bold">
            {icon}
          </div>
        ) : React.isValidElement(icon) ? (
          <div className="self-stretch p-1 my-auto w-6">{icon}</div>
        ) : null}
        <button 
        className="self-stretch my-auto text-base"
        onClick={handleClick}>{text}</button>
      </div>
    </div>
  );
}

export default SidebarItem;
