import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-dvh bg-[#f7f7f7] overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((v) => !v)}
        />
      </div>

      {/* Overlay */}
      <div
        className={[
          "fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={() => setMobileOpen(false)}
      />

      {/* Drawer */}
      <div
        className={[
          "fixed inset-y-0 left-0 z-50 w-[82vw] max-w-[320px] md:hidden",
          "transform transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        {/* drawer surface */}
        <div className="h-full bg-[#3D3936] shadow-2xl">
          <Sidebar
            collapsed={false}
            onToggle={() => setMobileOpen(false)}
            variant="drawer"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex min-w-0 min-h-0 flex-1 flex-col px-4 md:px-6">
        <Navbar onMenuClick={() => setMobileOpen(true)} />
        <div className="min-h-0 flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
