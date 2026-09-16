"use client";

import Link from "next/link";
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
    } else {
      setMessage(data.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full flex flex-col items-center gap-6">
        <h1 className="text-7xl text-fuchsia-700 font-(family-name:--font-comic-relief)">
          Chronos
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm flex flex-col gap-4 shadow-lg p-9 rounded-lg bg-gray-800"
        >
          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="bg-gray-600 border border-fuchsia-900 p-2 rounded-lg outline-none w-full"
            placeholder="Write your name"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-600 border border-fuchsia-900 p-2 rounded-lg outline-none w-full"
            placeholder="Write your email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-600 border border-fuchsia-900 p-2 rounded-lg outline-none w-full"
            placeholder="Write your password"
          />
          {/* <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-white p-2"
          placeholder="Confirm your password"
        /> */}
          <p className="flex items-center justify-end gap-1 text-sm">
            Not account?
            <Link href={"/login"} className="text-fuchsia-700">
              Login
            </Link>
          </p>
          <button
            type="submit"
            className="flex items-center justify-center p-3 rounded-lg bg-fuchsia-700 cursor-pointer md:hover:bg-fuchsia-800"
          >
            Register
          </button>
          <div className="m-1">
            {message && (
              <p className="text-fuchsia-700 mt-4 flex items-center justify-center">
                {message}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
