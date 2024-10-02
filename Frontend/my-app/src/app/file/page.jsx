import Sidebar from "./Sidebar";
import { CloudArrowUpIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

function SettingPage() {
  return (
    <main className="h-screen flex">
      <div className="w-2/12">
        <Sidebar />
      </div>
      <div className="w-10/12 bg-[#1d203e] flex justify-start">
        <div className="flex flex-col items-center justify-start w-full mt-20">
          <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 space-x-2">
            <CloudArrowUpIcon className="h-6 w-6 text-white" />
            Upload
          </button>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-8">
            <div className="bg-white p-4 rounded-lg shadow w-64 h-64 relative overflow-hidden">
              <Image
                src="/images/Network.jpg"
                alt="Network Diagram"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                className="rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <LockClosedIcon className="h-30 w-24 text-black p-8" />
              </div>
            </div>
            
            <div className="bg-gray-500 p-4 rounded-lg shadow flex items-center justify-center w-64 h-64">
              <LockClosedIcon className="h-24 w-24 text-white p-8" />
            </div>
            <div className="bg-gray-500 p-4 rounded-lg shadow flex items-center justify-center w-64 h-64">
              <LockClosedIcon className="h-24 w-24 text-white p-8" />
            </div>
            <div className="bg-gray-500 p-4 rounded-lg shadow flex items-center justify-center w-64 h-64">
              <LockClosedIcon className="h-24 w-24 text-white p-8" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-2">
            <div className="rounded-lg shadow flex items-center justify-center w-64">
              <h1 className="text-white">NetworkDiagram_main</h1>
            </div>
            {/* <div className="bg-gray-500 rounded-lg shadow flex items-center justify-center w-64">
            </div>
            <div className="bg-gray-500 rounded-lg shadow flex items-center justify-center w-64">
            </div>
            <div className="bg-gray-500 rounded-lg shadow flex items-center justify-center w-64">
            </div> */}
            
          </div>
          
        </div>
      </div>
    </main>
  );
}

export default SettingPage;
