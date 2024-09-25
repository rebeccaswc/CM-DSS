"use client";

import React from "react";
import { useRouter } from 'next/navigation';
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { ArrowLeft } from "lucide-react";

function Header() {

  const router = useRouter();

  const handleClick = () => {
    router.push('/alert');
  }

  const print = () => {
    window.print();
  }

  return (
    <header className="flex overflow-hidden flex-wrap gap-5 justify-between items-start px-6 py-3 w-full text-xs font-medium text-center whitespace-nowrap bg-slate-800 max-md:px-5 max-md:max-w-full">
      <div className="flex gap-2">
        <button 
        className="p-1 bg-indigi-300 bg-[#49495C] rounded-full"
        onClick={handleClick}>
          <ArrowLeft className="w-3 h-3" />
        </button>
        <div className="px-4 py-1  text-sm bg-gradient-to-b from-[#B945DF] to-[#642579] rounded-full max-md:px-5">Happy Chat</div>
      </div>
      <div className="w-[442px] h-6 relative">
        <div className="w-[442px] h-6 left-0 top-1 px-4 py-1 absolute bg-gradient-to-b from-[#2e335a] to-[#1c1b33] rounded border-solid border-2 border-white/20" />
        <div className="h-6 left-[182px] top-1 absolute justify-start gap-1 inline-flex">
          <div className="flex items-center text-white gap-2 text-[13px]">
            <UserCircleIcon className="w-4 h-4 text-white" />
            <div className="text-[13px]">Assistant</div>
          </div>
        </div>
      </div>
      <div className="flex gap-2.5 px-4 py-1">
        <button className="flex gap-1 px-3 py-0.5 rounded-3xl bg-stone-900 bg-opacity-30 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
        onClick={print}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/85e5838a487ebc01c6384a54c3f888c53852ae2643aee593d558cd727671a157?placeholderIfAbsent=true&apiKey=bae4f78d557141349e757a6705679bd5"
            alt=""
            className="object-contain shrink-0 self-start aspect-square w-[13px]"
          />
          <span>PDF</span>
        </button>
        <button className="flex gap-1 px-3 py-1 rounded-3xl bg-stone-900 bg-opacity-30 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d45f0b70cbcc0d72ed3a0e43d0e907792646d575f8cc393a1780f15e1aeaf584?placeholderIfAbsent=true&apiKey=bae4f78d557141349e757a6705679bd5"
            alt=""
            className="object-contain shrink-0 self-start w-2.5 aspect-square"
          />
          <span>Help</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
