import Sidebar from "./Sidebar";
import Content from "./Content";

export default function HomePage() {
  return (
    <main>
        <div className="relative h-844 w-1280">
            <div className="absolute inset-y-0 left-0 w-2/12">
                <Sidebar/>
            </div>
            <div className="absolute inset-y-0 right-0 w-10/12">
                <Content/>
            </div>
        </div>
        
    </main>
  );
}
