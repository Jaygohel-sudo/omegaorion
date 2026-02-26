import { Users } from "lucide-react";
import type { Person } from "./types";

export default function PersonCard({ person }: { person: Person }) {
  return (
    <div className="rounded-[20px] bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.04)] border border-stone-100">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="h-[110px] w-[110px] overflow-hidden rounded-full bg-stone-100">
            <img
              src={person.avatarUrl}
              alt={person.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="absolute bottom-1 right-1 grid h-9 w-9 place-items-center rounded-full bg-[#2f2a27] text-white shadow-sm">
            <Users className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-4 text-center">
          <div className="text-[14px] font-semibold text-[#3D3936]">
            {person.name}
          </div>

          <div className="mt-1 text-[12px] font-medium text-[#947550]">
            {person.role}
          </div>

          <div className="mt-3 flex items-center justify-center gap-2">
            {person.statusColors.map((c, idx) => (
              <span
                key={idx}
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
