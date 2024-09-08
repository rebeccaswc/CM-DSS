import Sidebar from "./Sidebar";
import Content from "./Content";
import Searchbar from "./Searchbar";

export default function HomePage() {
  return (
    <main>
      <div className="relative h-844 w-1280">
        <div className="absolute inset-y-0 left-0 w-1/12">
          <Sidebar />
        </div>
        <div className="absolute inset-y-0 right-0 w-11/12">
          <Content />
        </div>
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
