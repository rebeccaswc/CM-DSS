import Searchbar from "./Searchbar";

function Content() {
  return (
    <main>
        <div className="relative h-844 w-1016">
            <div className="absolute inset-x-0 top-0 h-10 w-full flex overflow-hidden flex-col justify-center items-center text-sm text-center text-white whitespace-nowrap bg-[#2C2F48]">
                <Searchbar/>
            </div>
            <div className="absolute inset-y-10 bottom-0 h-834 w-full bg-[#2C2F48]">
                <h1 className="p-4 text-4xl text-white"> Alert List </h1>
            </div>
        </div>
        
    </main>
  );
}

export default Content;