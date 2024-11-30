import Sidebar from "./Sidebar";
import Content from "./Content";
import AuthGuard from '../../components/ui/AuthGuard';

export default function HomePage() {
  return (
    <AuthGuard>
    <main className="h-screen flex">
      <div className="w-2/12">
        <Sidebar/>
      </div>
      <div className="w-10/12 bg-[#1d203e]">
        <Content/>
      </div>
    </main>
    </AuthGuard>
    
  );
}
