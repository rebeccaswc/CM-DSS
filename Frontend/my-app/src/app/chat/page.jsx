"use client";
import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { getChatResponse } from '../api/chat';
import ReactMarkdown from 'react-markdown';
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    // Function to handle message sending
    const handleSend = async () => {
        if (input.trim() === '') return;

        const userMessage = {sender: 'user', text: input};
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInput('');

        try {
            const res = await getChatResponse(input);
            const botMessage = {sender: 'bot', text: res.response};
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.log('Error fetching response:', error);
        }
    };

    // Function to handle enter key press
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSend();
        }
    };

    // Scroll to the bottom when new messages are added
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

  return (
    <main className="h-screen flex text-white">
      <div className="w-2/12">
        <Sidebar />
        </div>
        <div className="w-10/12 flex flex-col">
          <Header />
            <section className="flex-1 flex flex-col bg-[#1d203e] px-20 py-11 max-md:px-5">
              <div className="flex-1 w-full overflow-y-scroll max-w-[765px] mx-auto">
                  <div className="h-96 ">
                      {messages.map((msg, index) => (
                          <div key={index} className={`${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                              <div className={`my-2 p-2 inline-block rounded-lg ${msg.sender === 'user' ? 'bg-[#DB61C6]' : 'bg-[#9320C9]'}`}>
                                  {msg.sender === 'bot' ? (
                                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                                  ) : (
                                      msg.text
                                  )}
                              </div>
                          </div>
                      ))}
                      <div ref={messagesEndRef} />
                  </div>
              </div>
          <div className="w-full max-w-[765px] mx-auto">
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
                    value={input}
                    className="flex-grow w-full bg-transparent border-none outline-none"
                    placeholder="Enter your question here"
                    aria-label="Enter your question here"
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    />
                </div>
                <button type="submit" aria-label="Submit question">
                    <ArrowRightCircleIcon className='object-contain shrink-0 self-start w-12 aspect-[2.18]'
                    onClick={() => handleSend()}/>
                </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
