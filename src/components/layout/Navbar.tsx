import { useEffect, useState } from "react";
import { Clock, Inbox, NotebookPen, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

type NavbarProps = {
  onMenuClick?: () => void;
};

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const location = useLocation();
  const [showNotes, setShowNotes] = useState(false);

  const getPageTitle = (pathname: string) => {
    if (pathname === "/") return "Home";

    return pathname
      .replace("/", "")
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <nav className="mt-4 w-full rounded-[20px] bg-white px-4 md:px-6 py-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* TOP ROW (mobile) / LEFT (desktop) */}
        <div className="flex items-center justify-between md:justify-start md:gap-3">
          {/* menu button (only mobile) */}
          <button
            onClick={onMenuClick} // if you have it
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="text-[18px] font-medium">
            {getPageTitle(location.pathname)}
          </div>
        </div>

        {/* CONTROLS ROW */}
        <div className="flex items-center justify-between gap-2 md:justify-end">
          {/* left group */}
          <div className="flex items-center gap-2">
            <div className="rounded-full border border-[#E5E5E4] px-3 py-2 text-[12px] md:text-[14px] font-medium">
              MST
            </div>

            <div className="flex items-center rounded-full border border-[#E5E5E4] px-3 py-2 text-[12px] md:text-[16px] font-medium gap-2">
              <Clock className="h-5 w-5 text-[#3D3936]" />

              <span className="tabular-nums">
                {currentTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>

              <div className="relative">
                <button
                  onClick={() => setShowNotes((v) => !v)}
                  className="flex h-8 w-9 items-center justify-center rounded-full border border-[#E5E5E4] bg-[#f7f7f7] hover:bg-stone-50"
                  aria-label="Notes"
                >
                  <NotebookPen className="h-4 w-4 text-[#3D3936]" />
                </button>

                {showNotes && (
                  <div className="absolute right-0 mt-2 w-64 rounded-xl border border-stone-200 bg-white p-4 shadow-lg z-50">
                    <textarea
                      placeholder="Write a quick note..."
                      className="w-full resize-none rounded-lg border border-stone-200 p-2 text-sm outline-none"
                      rows={4}
                    />
                    <button className="mt-2 w-full rounded-lg bg-[#2f2a27] py-2 text-sm text-white">
                      Save
                    </button>
                  </div>
                )}
              </div>
            </div>

            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white hover:bg-stone-50">
              <Inbox className="h-4 w-4 text-stone-700" />
            </button>
          </div>

          <button className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-stone-200 bg-white hover:bg-stone-50">
            <img src="/assets/Ellipse 323.svg" alt="Profile" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
