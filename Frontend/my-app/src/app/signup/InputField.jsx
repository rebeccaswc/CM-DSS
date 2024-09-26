import React from "react";

function InputField({ label, value, onChange, type = "text" }) {
  return (
    <>
      <label
        className="overflow-hidden z-10 px-2 py-3 mt-6 ml-6 font-semibold whitespace-nowrap text-neutral-400 w-[99px] max-md:mt-10 max-md:ml-2.5"
        htmlFor={label.toLowerCase()}
      >
        {label}
      </label>
      <input
        type={type}
        id={label.toLowerCase()}
        value={value}
        onChange={onChange}
        className="px-4 py-4 font-semibold whitespace-nowrap rounded-2xl border border-solid border-neutral-400 text-stone-800 max-md:px-5 max-md:max-w-full"
      />
    </>
  );
}

export default InputField;
