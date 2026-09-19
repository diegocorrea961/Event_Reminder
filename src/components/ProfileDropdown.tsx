"use client";

import { signOut } from "next-auth/react";

export default function ProfileDropdown() {
  return (
    <div className="absolute right-0 top-full mt-2 w-32 bg-gray-800 border border-fuchsia-900 rounded-lg shadow-lg z-50 flex flex-col">
      <button
        onClick={() => signOut()}
        className="px-4 py-2 text-white text-left hover:bg-fuchsia-900 rounded-lg cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
}
