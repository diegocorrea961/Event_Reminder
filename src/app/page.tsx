"use client";

import EventModal from "@/components/EventModal";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function loadEvents() {
    const response = await fetch("/api/events");
    const data = await response.json();
    setEvents(data.events);
  }

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <header className="w-full flex items-center justify-between px-6 py-4 bg-gray-800 border-b border-fuchsia-900">
        <h1 className="text-5xl text-fuchsia-700 font-(family-name:--font-comic-relief)">
          Chronos
        </h1>
        <span className="flex gap-3">
          <p>Olá (nome do usuário)</p>
          <button
            onClick={() => signOut()}
            className="text-white text-sm hover:text-fuchsia-400 cursor-pointer"
          >
            ➜]
          </button>
        </span>
      </header>
      <div className="w-full flex-1 flex items-center justify-center gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-gray-800 max-w-sm shadow-2xl rounded-lg p-8 border border-fuchsia-800"
          >
            <p className="text-lg font-bold text-white">{event.title}</p>
            <p className="text-sm text-gray-300">{event.description}</p>
            <p className="text-sm text-fuchsia-400 mt-2">{event.date}</p>
          </div>
        ))}

        <button
          onClick={() => setIsModalOpen(true)}
          className="text-white py-3 px-5 text-2xl cursor-pointer shadow-lg rounded-full bg-fuchsia-800 md:hover:bg-fuchsia-900 fixed bottom-6 right-6 hover:scale-105 transition-transform"
        >
          +
        </button>
        {isModalOpen && (
          <EventModal
            onClose={() => setIsModalOpen(false)}
            onEventCreated={loadEvents}
          />
        )}
      </div>
    </div>
  );
}
