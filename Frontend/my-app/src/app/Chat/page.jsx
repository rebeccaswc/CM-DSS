
"use client";

import React from "react";
import Header from "./Header";
import Summary from "./Summary";
import Sidebar from "./Sidebar";
import ChatInput from "./ChatInput";
import { useSearchParams } from 'next/navigation';

function Chatpage() {

  const searchParams = useSearchParams();
  const alertID = searchParams.get('alertID');

  return (
    <main className="h-screen flex text-white ">
      <div className="w-2/12">
        <Sidebar />
      </div>
      <div className="w-10/12 flex flex-col">
        <Header
        alertID={alertID} />
        <section className="flex-1 flex flex-col bg-[#1d203e] px-20 py-11 overflow-y-auto max-md:px-5">
          <div className="flex-1 w-full max-w-[765px] mx-auto">
            <Summary
            index={alertID} />
          </div>
          <div className="w-full max-w-[765px] mx-auto mt-4">
            <ChatInput />
          </div>
        </section>
      </div>
    </main>
  );
}

export default Chatpage;
