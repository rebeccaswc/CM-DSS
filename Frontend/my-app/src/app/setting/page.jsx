import Sidebar from "./Sidebar";
import InfoList from "./InfoList";
import AuthGuard from "../../components/ui/AuthGuard";

function SettingPage() {
  return (
    <AuthGuard>
      <main className="h-screen flex">
        <div className="w-2/12">
          <Sidebar />
        </div>
        <div className="w-10/12 bg-[#1d203e] flex justify-start">
          <div className="flex flex-col items-center justify-start w-full mt-20">
            <InfoList />
          </div>
        </div>
      </main>
    </AuthGuard>
  );
}

export default SettingPage;
