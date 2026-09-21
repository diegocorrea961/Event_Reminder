"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import BurgerDropdown from "./BurgerDropdown";
import ProfileDropdown from "./ProfileDropdown";

export default function Header() {
  const { data: session } = useSession();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-zinc-800 border-b border-amber-900">
      <div className="relative">
        <button
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="text-2xl cursor-pointer md:hover:scale-105 transition-transform"
        >
          ≡
        </button>
        {isNavOpen && <BurgerDropdown onClose={() => setIsNavOpen(false)} />}
      </div>
      <h1 className="text-5xl text-amber-700 font-(family-name:--font-bungee-shade)">
        Chronos
      </h1>
      <div className="relative flex items-center">
        <p className="text-md font-semibold">
          Olá{" "}
          <span className="text-amber-400 text-sm font-medium">
            {session?.user?.name}
          </span>
        </p>
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="text-white text-2xl ml-2 cursor-pointer hover:text-amber-400"
        >
          𖨆
        </button>
        {isProfileOpen && <ProfileDropdown />}
      </div>
    </header>
  );
}
