import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Download,
  Filter,
  Plus,
  LayoutGrid,
  Rows3,
  Network,
} from "lucide-react";

import { peopleMock } from "./people.mock";
import PersonCard from "../../../features/people/PersonCard";

const PeoplePage = () => {
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "list" | "org">("grid");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const filteredPeople = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return peopleMock;

    return peopleMock.filter((p) =>
      `${p.name} ${p.role} ${p.id}`.toLowerCase().includes(q),
    );
  }, [query]);

  const total = filteredPeople.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);

  const pageItems = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filteredPeople.slice(start, start + pageSize);
  }, [filteredPeople, safePage, pageSize]);

  const startRow = total === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const endRow = Math.min(safePage * pageSize, total);

  // (You have currentTime in your file but it's unused here, so I removed it.)
  // If you still need it, keep your existing timer logic.

  useEffect(() => {
    // no-op currently
  }, []);

  return (
    <div className="min-h-0 flex-1 pb-6">
      <div className="mt-4 w-full rounded-[20px] bg-white px-4 py-4 md:px-6">
        {/* TOOLBAR */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* searchbar */}
          <div className="flex w-full md:max-w-md items-center gap-2 rounded-full border border-[#E5E5E4] px-4 py-2 text-[14px] font-normal text-[#3D393699]">
            <Search className="h-4 w-4 text-[#3D3936]" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              type="text"
              placeholder="Search by Employee Name or Number"
              className="w-full bg-transparent outline-none placeholder:text-[#3D393699]"
            />
          </div>

          {/* actions */}
          <div className="flex flex-wrap items-center gap-2 justify-start md:justify-end">
            <IconButton>
              <Download className="h-4 w-4" />
            </IconButton>

            <IconButton>
              <Filter className="h-4 w-4" />
            </IconButton>

            <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#2f2a27] text-white shadow-sm">
              <Plus className="h-5 w-5" />
            </button>

            <div className="ml-0 md:ml-2 flex items-center gap-2">
              <ToggleButton
                active={view === "grid"}
                onClick={() => setView("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </ToggleButton>
              <ToggleButton
                active={view === "list"}
                onClick={() => setView("list")}
              >
                <Rows3 className="h-4 w-4" />
              </ToggleButton>
              <ToggleButton
                active={view === "org"}
                onClick={() => setView("org")}
              >
                <Network className="h-4 w-4" />
              </ToggleButton>
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="mt-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pageItems.map((p) => (
              <PersonCard key={p.id} person={p} />
            ))}
          </div>

          {/* PAGINATION */}
          <div className="mt-6 flex flex-col gap-3 border-t border-stone-100 pt-4 text-sm text-stone-600 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <span>Rows per page:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
                className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm outline-none"
              >
                <option value={8}>8</option>
                <option value={12}>12</option>
                <option value={16}>16</option>
              </select>
            </div>

            <div className="flex items-center gap-3 md:justify-end">
              <span>
                {startRow}-{endRow} of {total}
              </span>

              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="rounded-lg px-2 py-1 hover:bg-stone-100 disabled:opacity-40 disabled:hover:bg-transparent"
              >
                ‹
              </button>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                className="rounded-lg px-2 py-1 hover:bg-stone-100 disabled:opacity-40 disabled:hover:bg-transparent"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeoplePage;

function IconButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-700 hover:bg-stone-50">
      {children}
    </button>
  );
}

function ToggleButton({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200",
        active
          ? "bg-[#2f2a27] text-white"
          : "bg-white text-stone-700 hover:bg-stone-50",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
