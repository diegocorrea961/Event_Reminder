"use client";

import Link from "next/link";

export default function BurgerDropdown({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute left-0 top-full mt-2 w-40 bg-zinc-800 border border-amber-900 rounded-lg shadow-lg z-50 flex flex-col">
      <Link
        href="/"
        onClick={onClose}
        className="px-4 py-2 text-white hover:bg-amber-900 rounded-t-lg"
      >
        Home
      </Link>
      <Link
        href="/calendar"
        onClick={onClose}
        className="px-4 py-2 text-white hover:bg-amber-900 rounded-b-lg"
      >
        Calendar
      </Link>
    </div>
  );
}
