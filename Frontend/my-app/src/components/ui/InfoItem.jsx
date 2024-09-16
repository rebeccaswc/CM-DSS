"use client";
import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

function DetailInfo({ title, content }){

  const [isOpen, setIsOpen] = useState(true);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="flex flex-col p-4 w-full bg-white rounded-lg border border-solid border-zinc-300 max-md:max-w-full bg-[#2B305C] text-white">
      <div className="flex flex-wrap gap-2 items-center w-full font-[number:var(--sds-typography-body-font-weight-strong)] max-md:max-w-full">
        <div className="flex-1 shrink self-stretch my-auto basis-0 opacity-[var(--sds-size-stroke-border)] max-md:max-w-full font-bold text-xl rounded-lg">
          {title}
        </div>
        <button onClick={toggleOpen}>
          {isOpen ? (
            <ChevronUpIcon className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square" />
          ) : (
            <ChevronDownIcon className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square" />
          )}
        </button>
      </div>
      {isOpen && (
        <div className="flex justify-center items-center mt-4 w-full font-[number:var(--sds-typography-body-font-weight-regular)] max-md:max-w-full">
          <div className="flex-1 shrink self-stretch my-auto basis-0 opacity-[var(--sds-size-stroke-border)] max-md:max-w-full">
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailInfo;
