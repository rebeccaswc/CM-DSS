import React from "react";

function Header() {
  return (
    <header className="flex items-center  gap-10 w-full w-full px-2 py-4 max-md:px-2">
      <div className="flex flex-1 text-3xl font-bold leading-none text-white whitespace-nowrap">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/9a613f1da2a3e4d8ea79f2d50742e932477c4ca6c6cf5949ac5f37f116420f31?placeholderIfAbsent=true&apiKey=28de845becb84891bdbb0bd3f501c2db"
          alt="CM-DSS Logo"
          className="object-contain shrink-0 rounded-md aspect-[0.75] w-[61px] ml-[-150px]"
        />
        <div className="self-start mt-3.5 basis-auto">CM-DSS</div>
      </div>
      <nav className="flex gap-7 ml-auto text-base font-medium ">
        <a href="/login"  className="flex items-center justify-center w-[112px] h-[42px] shrink-0 rounded-[5px] border-2 border-[#FFA6FA] bg-[rgba(255,255,255,0.03)] backdrop-blur-[5px] text-white"        >
          Sign In
        </a>
        <a href="/signup"  className="flex items-center justify-center w-[112px] h-[42px] shrink-0 rounded-[5px] border-2 border-[#FFA6FA] bg-[rgba(255,255,255,0.03)] backdrop-blur-[5px] text-white"        >
          Sign Up
        </a>
      </nav>
    </header>
  );
}

export default Header;
