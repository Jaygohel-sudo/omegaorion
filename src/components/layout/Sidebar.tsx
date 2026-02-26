import {
  Home,
  User,
  Users,
  Briefcase,
  FolderKanban,
  UserPlus,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChartPie,
  Bolt,
} from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "My Info", href: "/my-info", icon: User },
  { label: "People", href: "/people", icon: Users },
  { label: "Team Management", href: "/team-management", icon: Briefcase },
  { label: "Project Setup", href: "/project-setup", icon: FolderKanban },
  { label: "Hiring", href: "/hiring", icon: UserPlus },
  { label: "Report", href: "/report", icon: ChartPie },
];

const Sidebar = ({
  onToggle,
  collapsed = false,
}: {
  onToggle?: () => void;
  collapsed?: boolean;
}) => {
  return (
    <div className="h-dvh p-4">
      <aside
        className={[
          "flex h-full flex-col bg-[#3D3936] text-white rounded-[16px]",
          collapsed ? "w-20" : "w-72",
        ].join(" ")}
      >
        <div className="flex items-center justify-between px-6 py-6">
          {collapsed ? (
            <button
              onClick={onToggle}
              aria-label="Expand sidebar"
              className="group flex w-full items-center justify-center"
            >
              <div className="relative flex h-10 w-10 items-center justify-center rounded-lg transition hover:bg-white/10">
                <span className="absolute text-3xl font-extrabold transition-opacity duration-100 group-hover:opacity-0">
                  C
                </span>
                <ChevronsRight className="absolute h-5 w-5 opacity-0 transition-opacity duration-100 group-hover:opacity-100" />
              </div>
            </button>
          ) : (
            <>
              <div className="text-2xl font-extrabold ">
                <img src="/assets/logo.svg" alt="" />
              </div>
              <button
                onClick={onToggle}
                aria-label="Collapse sidebar"
                className="rounded-lg px-2 py-1 text-white/70 hover:bg-white/10 hover:text-white transition"
              >
                <ChevronsLeft className="s-6" />
              </button>
            </>
          )}
        </div>
        {/* nav */}
        <nav className="px-4">
          <ul className="space-y-1">
            {navItems.map((it) => {
              const Icon = it.icon;
              return (
                <li key={it.label} className="w-full">
                  <NavLink
                    to={it.href}
                    end={it.href === "/"}
                    className={({ isActive }) =>
                      [
                        "relative flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[16px] -tracking-[2%] font-display transition",
                        isActive
                          ? "bg-white text-[#947550]"
                          : "text-white/70 hover:bg-white/10 hover:text-white",
                        collapsed ? "justify-center px-0" : "",
                      ].join(" ")
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <span className="absolute -left-4 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r bg-white" />
                        )}
                        <Icon className="s-[12px] shrink-0" />
                        {!collapsed && (
                          <>
                            <span className="flex-1">{it.label}</span>
                            {!isActive && (
                              <ChevronRight className="h-4 w-4 text-white/40" />
                            )}
                          </>
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
        {/* bottom */}
        <div className="mt-auto p-4">
          <button
            className={[
              "flex w-full items-center gap-3 rounded-xl border border-white/10  px-4 py-3 text-[16px] -tracking-[2%] font-display  text-white hover:bg-white/10",
              collapsed ? "justify-center px-0" : "",
            ].join(" ")}
          >
            <Bolt className="s-[20px]" />
            {!collapsed && <span>Settings</span>}
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
