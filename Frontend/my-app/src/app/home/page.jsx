"use client";
import React from "react";
import Header from "./Header";
import MainContent from "./MainContent";

function HomePage() {
  return (
    <div
      className="flex relative flex-col items-center px-20 pt-5 pb-40 w-full min-h-screen rounded-none min-h-[884px] bg-[#4F30A8] max-md:px-5 max-md:pb-24 max-md:-mr-1.5 max-md:max-w-full"
    >
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/d0fa4596afaa2d9ed698033504476e18c2d6d68189f9f162fec1d1e56b16d1b7?placeholderIfAbsent=true&apiKey=28de845becb84891bdbb0bd3f501c2db"
        alt=""
        className="object-cover absolute inset-0 size-full"
      />
      <div className="flex relative flex-col mb-0 w-full max-w-[1161px] max-md:mb-2.5 max-md:max-w-full">
        <Header />
        <MainContent />
      </div>
    </div>
  );
}


export default HomePage;
