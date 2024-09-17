"use client";
import React from 'react';
import { ChevronRightIcon, CursorArrowRippleIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

function HomePage(){

  const router = useRouter();
  
  const handleClick = (text) => {
    var path = '/' + text;
    router.push(path.toLowerCase());
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="flex justify-between items-center p-6">
        <div className="text-2xl font-bold">Logo</div>
        <nav className="space-x-6">
          <button className="hover:text-gray-400" onClick={() => handleClick("Dashboard")}>DashBoard</button>
          <button className="hover:text-gray-400" onClick={() => handleClick("Alert")}>Alert</button>
          <button className="hover:text-gray-400" onClick={() => handleClick("Chat")}>Chat</button>
          <button className="hover:text-gray-400" onClick={() => handleClick("File")}>File</button>
          <button className="hover:text-gray-400" onClick={() => handleClick("Setting")}>Setting</button>
        </nav>
        <button className="text-gray-400 hover:text-white">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </header>

      <main className="flex flex-col items-center justify-center text-center px-6 py-12 space-y-12">
        <div className="w-120 border-4 border-rose-300 rounded-lg px-12 py-10">
          <h1 className="text-5xl font-bold leading-tight mb-6">
            CM-DSS
          </h1>
          <h2 className="text-4xl leading-tight text-gray-300">
            The Assistant Of Intellgence 
          </h2>
        </div>
        <div className="space-y-4">
            <div className='flex flex-row items-center justify-center'>
                <CursorArrowRippleIcon className='w-10 h-10 mr-4'/>
                <h2 className="text-3xl font-semibold">Explore More</h2>
            </div>
          <p className="max-w-lg mx-auto text-gray-400">Hint : This is a AI Assistant to give a summarization of alert accident happened in your organization.The answer from the AI Assistant may have error, please check before taking action.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-20">
          <button className="flex flex-col items-center space-y-2 bg-gradient-to-r from-[#7740EB] to-[#2C2F9A] text-white px-4 py-2 rounded-lg hover:text-blue-400 transition duration-300" onClick={() => handleClick("Dashboard")}>
            <div className='flex flex-row'>
                <ChevronRightIcon className="h-16 w-6 mr-2" />
                <div className="text-2xl font-bold my-4">DashBoard</div>
            </div>
            <span className='mb-2 text-gray-300'>Click to see the visualization data.</span>
          </button>
          <button className="flex flex-col items-center space-y-2 bg-gradient-to-r from-[#7740EB] to-[#2C2F9A] text-white px-4 py-2 rounded-lg hover:text-blue-400 transition duration-300" onClick={() => handleClick("Alert")}>
            <div className='flex flex-row'>
                <ChevronRightIcon className="h-16 w-6 mr-2" />
                <div className="text-2xl font-bold my-4">Alert</div>
            </div>
            <span className='mb-2 text-gray-300'>Find out the alert in your organization.</span>
          </button>
          <button className="flex flex-col items-center space-y-2 bg-gradient-to-r from-[#7740EB] to-[#2C2F9A] text-white px-4 py-2 rounded-lg hover:text-blue-400 transition duration-300" onClick={() => handleClick("Chat")}>
            <div className='flex flex-row'>
                <ChevronRightIcon className="h-16 w-6 mr-2" />
                <div className="text-2xl font-bold my-4">Chat</div>
            </div>
            <span className='mb-2 text-gray-300'>Query quesction about cybersecurity.</span>
          </button>
          <button className="flex flex-col items-center space-y-2 bg-gradient-to-r from-[#7740EB] to-[#2C2F9A] text-white px-4 py-2 rounded-lg hover:text-blue-400 transition duration-300" onClick={() => handleClick("File")}>
            <div className='flex flex-row'>
                <ChevronRightIcon className="h-16 w-6 mr-2" />
                <div className="text-2xl font-bold my-4">File</div>
            </div>
            <span className='mb-2 text-gray-300'>Business Management Dashboard</span>
          </button>
          <button className="flex flex-col items-center space-y-2 bg-gradient-to-r from-[#7740EB] to-[#2C2F9A] text-white px-4 py-2 rounded-lg hover:text-blue-400 transition duration-300" onClick={() => handleClick("Setting")}>
            <div className='flex flex-row'>
                <ChevronRightIcon className="h-16 w-6 mr-2" />
                <div className="text-2xl font-bold my-4">Setting</div>
            </div>
            <span className='mb-2 text-gray-300'>Change your personal information.</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
