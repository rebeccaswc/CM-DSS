import React, {useEffect, useState} from "react";
import { getSummary } from "../api/summary";
import { remark } from 'remark';
import html from 'remark-html';
import ReactMarkdown from 'react-markdown';

function Summary({index}) {

  const [contentHtml, setContentHtml] = useState('');
  const [text, setText] = useState('');



  useEffect(() => {

    const fetchSummary = async () => {
      const res = await getSummary(index);
      setText(res.report);
    };

    fetchSummary();
    // markdown_text();

  },[]);


  return (
    <article className="flex flex-col px-8 py-6 w-full rounded-3xl max-md:px-5 max-md:max-w-full bg-gradient-to-br from-neutral-950 via-[#120d50] to-[#1a1095] rounded-[20px]">
      <div className="flex flex-wrap gap-5 justify-between mr-3 w-full max-md:mr-2.5 max-md:max-w-full">
        <div className="flex gap-3">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/eee8e6c76ed6bf6d117a2f0c912c05bcd3b648b281aea4b3f2c4aba71bac4bb9?placeholderIfAbsent=true&apiKey=bae4f78d557141349e757a6705679bd5"
            alt=""
            className="object-contain shrink-0 aspect-square rounded-[30px] w-[41px]"
          />
          <div className="flex flex-col my-auto">
            <h2 className="text-xs font-bold">SUMMARY</h2>
            <p className="self-start mt-2 text-xs font-medium">
              Power by OpenAI
            </p>
          </div>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/dc88d54b7de616c9cddbbc81fd85d2beabce7441758ca9a74292faecfb0c1239?placeholderIfAbsent=true&apiKey=bae4f78d557141349e757a6705679bd5"
          alt=""
          className="object-contain shrink-0 my-auto w-3.5 aspect-[0.87]"
        />
      </div>
      <hr className="shrink-0 mt-3 h-0 border border-solid border-neutral-400 max-md:max-w-full" />
      <div className="mt-3.5 mr-5 ml-6 max-md:mr-2.5 max-md:max-w-full">
        <h3 className="text-xl">Incident Assessment</h3>
        {/* <div dangerouslySetInnerHTML={{ __html: contentHtml }} /> */}
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    </article>

  );
}

export default Summary;
