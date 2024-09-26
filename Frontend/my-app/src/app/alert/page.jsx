import Sidebar from "./Sidebar";
import Content from "./Content";

export default function HomePage() {
  return (
    <main className="h-screen flex">
      <div className="w-2/12">
        <Sidebar/>
      </div>
      <div className="w-10/12 bg-[#1d203e]">
        <Content/>
      </div>
    </main>
  //   <main className="h-screen w-screen overflow-hidden">
  //   <div className="flex h-full w-full">
  //     <div className="w-1/12 h-full">
  //       <Sidebar />
  //     </div>
  //     <div className="w-11/12 h-full">
  //       <Content />
  //     </div>
  //   </div>
  // </main>
//   <main className="h-screen w-screen flex flex-col overflow-hidden">
//   {/* Searchbar on top */}
//   <div className="h-10 w-full bg-[#2C2F48] flex items-center justify-center">
//     <Searchbar />
//   </div>

//   {/* Main content area */}
//   <div className="flex flex-grow">
//     {/* Sidebar on the left */}
//     <div className="w-1/12 h-full flex-shrink-0 bg-[#7B579A]">
//       <Sidebar />
//     </div>

//     {/* Content on the right */}
//     <div className="w-11/12 h-full bg-gray-100">
//       <Content />
//     </div>
//   </div>
// </main>
  );
}
