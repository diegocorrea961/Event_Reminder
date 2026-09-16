"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setMessage("E-mail ou senha inválidos");
    } else {
      setMessage("Login successfull");
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
          className="w-full max-w-sm flex flex-col gap-4 shadow-lg px-6 py-9 rounded-lg bg-gray-800"
        >
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-600 border border-fuchsia-900 p-2 rounded-lg outline-none w-full"
            placeholder="Write your email"
          />
          <p className="flex items-end justify-end text-[10px]">
            <Link href={"/register"} className="text-fuchsia-700">
              Forget your password?
            </Link>
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-600 border border-fuchsia-900 p-2 rounded-lg outline-none w-full"
            placeholder="Write your password"
          />
          <p className="flex items-center justify-end gap-1 text-sm">
            Not account?
            <Link href={"/register"} className="text-fuchsia-700">
              Register
            </Link>
          </p>
          <button
            type="submit"
            className="flex items-center justify-center p-3 rounded-lg bg-fuchsia-700 cursor-pointer md:hover:bg-fuchsia-800"
          >
            <p className="text-white">Login</p>
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
