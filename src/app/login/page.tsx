"use client";

import { signIn } from "next-auth/react";
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
    <div className="flex">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center"
      >
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-white p-2"
          placeholder="Write your email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-white p-2"
          placeholder="Write your password"
        />

        <button type="submit">Login</button>
      </form>
      <div>
        {message && (
          <p className="text-white mt-4 flex items-center justify-center">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
