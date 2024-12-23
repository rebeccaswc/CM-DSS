import React from "react";
import SidebarItem from "../../components/ui/SidebarItem";
import {
  Squares2X2Icon,
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  DocumentIcon,
  BellAlertIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/solid';

const sidebarItems = [
  { icon: <HomeIcon className="h-4 w-4 text-white"/>,
    text: "Home", 
  },
  {
    icon: <Squares2X2Icon  className="h-4 w-4 text-white"/>,
    text: "Dashboard",
  },
  {
    icon: <BellAlertIcon className="h-4 w-4 text-white"/>,
    text: "Alert",
    isActive: true,
  },
  {
    icon: <ChatBubbleLeftEllipsisIcon className="h-4 w-4 text-white"/>,
    text: "Chat",
  },
  // {
  //   icon: <DocumentIcon className="h-4 w-4  text-white"/>,
  //   text: "File",
  // },
  {
    icon: <Cog6ToothIcon className="h-4 w-4  text-white"/>,
    text: "Setting",
  },
];

function Sidebar() {
  return (
    <nav className="h-screen min-w-max bg-[#7B579A] bg-indigo-500 opacity-75 bg-gradient-to-b from-[#2D1175] via-[#763370] via-[#8826AA] to-[#1D1E2C] flex flex-col">
      <div className="flex flex-col items-start pt-4 pl-2 flex-grow overflow-y-auto">
        <div className="flex flex-col w-full tracking-wide text-white whitespace-nowrap">
          {sidebarItems.map((item, index) => (
            <SidebarItem key={index} {...item} />
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
