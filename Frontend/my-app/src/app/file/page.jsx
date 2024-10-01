import Sidebar from "./Sidebar";
import {CloudArrowUpIcon, LockClosedIcon} from '@heroicons/react/24/solid'

function SettingPage(){
    return(
    <main className="h-screen flex">
      <div className="w-2/12">
        <Sidebar />
      </div>
      <div className="w-10/12 bg-[#1d203e] flex justify-start">
        <div className="flex flex-col items-center justify-start w-full mt-20">
          <button
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 space-x-2">
            <CloudArrowUpIcon className="h-6 w-6 text-white"/>
            Upload
          </button>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-8">
            <div className="bg-white p-4 rounded-lg shadow flex items-center justify-center w-64 h-64">
            <Image
                        src="/images/network.png" // 路徑從 public 資料夾開始
                        alt="Network Diagram"
                        width={400} // 設定圖片寬度
                        height={400} // 設定圖片高度
                        className="rounded-lg shadow-lg mb-8"
                    />
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

        </div>
        
      </div>
    </main>
    )
}

export default SettingPage;
