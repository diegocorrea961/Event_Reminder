"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nickname, email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage("Registration successfull");
      redirect("/login");
    } else {
      setMessage(data.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 gap-10">
      <div className="w-full flex flex-col items-center gap-6">
        <h1 className="text-7xl text-amber-700 font-(family-name:--font-bungee-shade)">
          Chronos
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm flex flex-col gap-4 shadow-lg p-9 rounded-lg bg-zinc-800"
        >
          <input
            type="name"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="bg-zinc-600 border border-amber-900 p-2 rounded-lg outline-none w-full"
            placeholder="Write your name"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-zinc-600 border border-amber-900 p-2 rounded-lg outline-none w-full"
            placeholder="Write your email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-zinc-600 border border-amber-900 p-2 rounded-lg outline-none w-full"
            placeholder="Write your password"
            required
          />
          {/* <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-white p-2"
          placeholder="Confirm your password"
        /> */}
          <p className="flex items-center justify-end gap-1 text-sm">
            Not account?
            <Link href={"/login"} className="text-amber-700">
              Login
            </Link>
          </p>
          <button
            type="submit"
            className="flex items-center justify-center p-3 rounded-lg bg-amber-700 cursor-pointer md:hover:bg-amber-800 hover:scale-105 transition-transform"
          >
            Register
          </button>
          <div className="m-1">
            {message && (
              <p className="text-amber-700 mt-4 flex items-center justify-center">
                {message}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
