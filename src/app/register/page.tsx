"use client";

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
    <div className="flex-col justify-center items-center">
      <form onSubmit={handleSubmit}>
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="border border-white text-white p-2"
          placeholder="Write your name"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-white text-white p-2"
          placeholder="Write your email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-white text-white p-2"
          placeholder="Write your password"
        />
        {/* <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-white p-2"
          placeholder="Confirm your password"
        /> */}

        <button type="submit">Register</button>
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
