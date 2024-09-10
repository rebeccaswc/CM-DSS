import React from "react";
import SidebarItem from "../../components/ui/SidebarItem";
import BrowseButton from "../../components/ui/BrowseButton";
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
  },
  {
    icon: <ChatBubbleLeftEllipsisIcon className="h-4 w-4 text-white"/>,
    text: "Chat",
    isActive: true,
  },
  {
    icon: <DocumentIcon className="h-4 w-4  text-white"/>,
    text: "File",
  },
  {
    icon: <Cog6ToothIcon className="h-4 w-4  text-white"/>,
    text: "Setting",
  },
];

function Sidebar() {
  return (
    <nav className="h-screen min-w-max bg-[#7B579A] bg-opacity-80 flex flex-col">
          <div className="pt-4 pl-2">
            <BrowseButton/>
          </div>
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