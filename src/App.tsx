import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";

export default function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-dvh bg-[#f7f7f7] overflow-hidden">
      <div className="hidden md:block">
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((v) => !v)}
        />
      </div>

      <div className="flex min-w-0 min-h-0 flex-1 flex-col px-4 md:px-6">
        <Navbar />
        <div className="min-h-0 flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
