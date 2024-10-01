"use client"; 
import React from "react";
import InfoItem from "../../components/ui/InfoItem";
import { IdentificationIcon, ArrowRightStartOnRectangleIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import useStore from "../../useStore";

function InfoList() {
    const email = useStore((state) => state.email);  // Get email from Zustand store
    const InfoData = [
    { title: "Account", content: email },
    { title: "Password", content: "********" },
    { title: "Billing", content: "Standard Plan"}
  ];

  return (
    <main className="flex flex-col w-10/12 gap-4 max-w-screen-sm leading-snug whitespace-nowrap">
      <div className="flex items-center gap-2 mb-4">
        <IdentificationIcon className="w-10 h-10 text-white"/>
        <h1 className="text-2xl font-bold text-white">Profile</h1>
      </div>
      
      {InfoData.map((item, index) => {
        if (item.title === "Password") {
          return (
            <div key={index} className="w-full flex flex-col">
              <InfoItem title={item.title} content={item.content} />
              <button className="flex flex-row mt-2 px-4 py-2 w-full border-solid ring-2 ring-blue-500/50 text-white rounded-lg justify-center">
                <PencilSquareIcon className="w-5 h-5 mr-2"/>
                Change Password
              </button>
            </div>
          );
        } else {
          return <InfoItem key={index} title={item.title} content={item.content} />;
        }
      })}
      <button className="flex flex-row mt-2 px-4 py-2 w-full border-solid ring-2 ring-red-500/50 text-white rounded-lg justify-center">
        <ArrowRightStartOnRectangleIcon className="w-5 h-5 mr-2"/>
        Sign Out
      </button>
    </main>
  );
}

export default InfoList;

