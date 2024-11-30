"use client";
import React, { useState, useEffect, useRef } from "react";
import useStore from "../../useStore";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { getChatResponse } from "../api/chat";
import ReactMarkdown from "react-markdown";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import AuthGuard from "../../components/ui/AuthGuard";

export default function Chat() {
  const alertID = useStore((state) => state.alertID);
  const image = useStore((state) => state.image);

  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  var botMessage = {};

  const fetchSummary = async () => {
    try {
      const formData = new FormData();
      formData.append('alert_id', alertID);

      const res = await getChatResponse(formData);
      console.log(res.alert_report);
      setText(res.alert_report);
    }catch(error) {
      console.log('Error fetching response:', error);
    }
    
  };

  const fetchResponse = async (input) => {
    try {
      const formData = new FormData();
      formData.append('alert_id', alertID);
      formData.append('message', input);

      const res = await getChatResponse(formData);
      botMessage = { sender: 'bot', text: res.chat_response, time: new Date().toLocaleTimeString() };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }catch(error) {
      console.log('Error fetching response:', error);
    }
  }

  const fetchSolution = async () => {
    try {
      const formData = image;
      formData.append('alert_id', alertID);
      
      const res = await getChatResponse(formData);
      console.log(res.alert_report);
      setText(res.alert_report);
    }catch(error) {
      console.log('Error fetching response:', error);
    }
  }

  // Function to handle message sending
  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input, time: new Date().toLocaleTimeString() };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    fetchResponse(input);
  };

  // Function to handle enter key press
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSend();
    }
  };

  const buttonClick = () => {
    if (image.length === 0) {
      window.alert("Please Upload The Network Diagram In File Page.");
    }else{
      console.log(image);
      window.alert("Generating Mitigation Recommendations Based on Network Diagram.");
      fetchSolution();
    }
  }

  // Scroll to the bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    fetchSummary();
  }, [messages]);

  return (
    <AuthGuard>
      <main className="h-screen flex text-white">
        <div className="w-2/12">
          <Sidebar />
        </div>
        <div className="w-10/12 flex flex-col">
          <Header />
          <section className="flex-1 flex flex-col overflow-y-hidden bg-[#1d203e] px-20 py-11 max-md:px-5">
            <div className="flex-1 w-full overflow-y-auto max-w-[850px] mx-auto pb-20">
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
                <ReactMarkdown>{text}</ReactMarkdown>
              </div>
            </article>
              <div className="h-96 mt-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex items-start ${msg.sender === 'user' ? 'flex-row-reverse text-left' : 'text-left'}`}>
                  <img
                    src='/images/userIcon.png'
                    alt={`${msg.sender}-icon`}
                    className="w-8 h-8 rounded-full mx-2"
                  />
                  <div className={`my-2 p-2 inline-block rounded-lg overflow-x-hidden ${msg.sender === 'user' ? 'bg-gradient-to-b from-[#B945DF] to-[#642579]' : 'bg-gradient-to-br from-neutral-950 via-[#120d50] to-[#1a1095]'}`}>
                    {msg.sender === 'bot' ? (
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    ) : (
                      msg.text
                    )}
                    <div className="text-xs text-gray-400 mt-1 text-right">{msg.time}</div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            </div>
            <div className="w-full max-w-[765px] mx-auto">
              <form className="flex flex-wrap gap-5 justify-between px-8 py-4 mt-4 w-full text-xs text-center border-b-2 border-purple-700 bg-black bg-opacity-50 rounded-[50px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5 max-md:max-w-full">
                <div className="flex gap-2 flex-grow">
                  <button onClick={buttonClick} type="button">
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
                    value={input}
                    className="flex-grow w-full bg-transparent border-none outline-none"
                    placeholder="Enter your question here"
                    aria-label="Enter your question here"
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <button type="submit" aria-label="Submit question">
                  <ArrowRightCircleIcon
                    className="object-contain shrink-0 self-start w-12 aspect-[2.18]"
                    onClick={() => handleSend()}
                  />
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>
    </AuthGuard>
  );
}
