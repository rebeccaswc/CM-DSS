import React from 'react';

function Searchbar() {
  return (
    <button className="flex gap-1 items-center px-16 max-w-full rounded border border-solid border-white border-opacity-20 w-[442px] max-md:px-5">
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/261d59fafe2a52865f679c34730d0a0f800a283bdb08b6ddd7093f7b64c0e7e9?placeholderIfAbsent=true&apiKey=bae4f78d557141349e757a6705679bd5" className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square" alt="" />
      <span className="self-stretch my-auto">Explore</span>
    </button>
  );
}

export default Searchbar;