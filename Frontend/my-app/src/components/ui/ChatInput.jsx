import React from "react";

function ChatInput() {
  return (
    <form className="flex flex-wrap gap-5 justify-between px-8 py-4 mt-4 w-full text-xs text-center border-b-2 border-purple-700 bg-black bg-opacity-50 rounded-[50px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5 max-md:max-w-full">
      <div className="flex gap-2 flex-grow">
        <button>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a2b99b7e670251061d9def7820d562722a51d47403d8895eab0abd2b5a1fa274?placeholderIfAbsent=true&apiKey=bae4f78d557141349e757a6705679bd5"
            alt=""
            className="object-contain shrink-0 w-6 aspect-square"
          />
        </button>
        <label htmlFor="questionInput" className="sr-only">
          Enter your question here
        </label>
        <input
          type="text"
          id="questionInput"
          className="flex-grow w-full bg-transparent border-none outline-none"
          placeholder="Enter your question here"
          aria-label="Enter your question here"
        />
      </div>
      <button type="submit" aria-label="Submit question">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4d6b0c8d932cc49fbac87736daf465cff6026f090ee4ede0735f98773ce65027?placeholderIfAbsent=true&apiKey=bae4f78d557141349e757a6705679bd5"
          alt=""
          className="object-contain shrink-0 self-start w-12 aspect-[2.18]"
        />
      </button>
    </form>
  );
}

export default ChatInput;
