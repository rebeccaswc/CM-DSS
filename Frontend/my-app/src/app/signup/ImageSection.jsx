import React from "react";

function ImageSection() {
  return (
    <section className="flex flex-col w-[31%] md:max-h-screen">
      <div className="flex relative flex-col grow px-16 pt-32 text-4xl font-bold text-center text-white whitespace-nowrap aspect-[0.472] pb-[683px] max-md:px-5 max-md:py-24">
        <h1 className="relative z-10 text-5xl text-white">CM-DSS</h1>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/9c4322e3f9d2d7794adde2f0c64befe4a9a84a15e28f14024a6f720e851c0444?placeholderIfAbsent=true&apiKey=bae4f78d557141349e757a6705679bd5"
          alt=""
          className="object-cover absolute inset-0 size-full"
        />
      </div>
    </section>
  );
}

export default ImageSection;
