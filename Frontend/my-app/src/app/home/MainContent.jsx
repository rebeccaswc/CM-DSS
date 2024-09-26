import React from "react";
import { useRouter } from "next/navigation";
function MainContent() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/alert');
  };
  return (
    <main className="flex flex-col self-end mt-64 max-w-full  text-white w-[500px] max-md:mt-10">
      <section className="self-start text-5xl max-md:text-4xl font-bold">
        CM-DSS
        <br />
        <span className="text-2xl">The Assistant Of Intelligence</span>
        <br />
      </section>
      <p className="mt-9 text-xl  max-md:mt-10 max-md:max-w-full">
        This is an AI Assistant to give a summarization of alert accidents happened in your organization.
        <br />
        The answer from the AI Assistant may have errors, please check before taking action.
      </p>
      <div className="flex items-center gap-1 self-end mt-24 mr-16 max-md:mt-10 max-md:mr-2.5">
      <button onClick={handleClick}>  
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5560a6dbb2aecf201dfad40af05a4670909ee2a4fbe9f25851d543c62989709f?placeholderIfAbsent=true&apiKey=28de845becb84891bdbb0bd3f501c2db"
          alt=""
          className="object-contain shrink-0 self-start mt-5 aspect-[0.9] w-[90px]"
        />
      </button>
        <div className="flex flex-col ">
          <h2 className="self-start text-xl tracking-wide leading-none font-bold">
            Are you ready?
          </h2>
          <p className="mt-3.5 text-sm">Let's get started with CM-DSS!</p>
        </div>
      </div>
    </main>
  );
}

export default MainContent;
