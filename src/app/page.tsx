"use client";

import EventModal from "@/components/EventModal";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ConfirmDeleteEvent from "@/components/ConfirmDeleteEvent";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);

  async function loadEvents() {
    const response = await fetch("/api/events");
    const data = await response.json();
    setEvents(data.events);
  }

  async function handleDelete(id: number) {
    const response = await fetch(`/api/events/${id}`, {
      method: "DELETE",
    });
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
        <span className="flex">
          <p className="text-md font-semibold">
            Olá{" "}
            <span className="text-fuchsia-400 text-sm font-medium">
              {session?.user?.name}
            </span>
          </p>
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
            className="bg-gray-800 max-w-sm shadow-2xl rounded-lg p-8 border border-fuchsia-800 cursor-pointer"
            onClick={() => {
              setSelectedEvent(event);
              setIsModalOpen(true);
            }}
          >
            <p className="text-lg font-bold text-white">{event.title}</p>
            <p className="text-sm text-gray-300">{event.description}</p>
            <p className="text-sm text-fuchsia-400 mt-2">{event.date}</p>
            <p
              onClick={(e) => {
                e.stopPropagation();
                // handleDelete(event.id);
                setEventToDelete(event);
              }}
              className="flex items-center justify-end mt-3 text-xl md:hover:text-red-500"
            >
              🗑
            </p>
          </div>
        ))}

        {eventToDelete && (
          <ConfirmDeleteEvent
            onConfirm={() => {
              handleDelete(eventToDelete.id);
              setEventToDelete(null);
            }}
            onEventDeleted={loadEvents}
            onCancel={() => setEventToDelete(null)}
          />
        )}
        <button
          onClick={() => {
            setSelectedEvent(null);
            setIsModalOpen(true);
          }}
          className="text-white py-3 px-5 text-2xl cursor-pointer shadow-lg rounded-full bg-fuchsia-800 md:hover:bg-fuchsia-900 fixed bottom-6 right-6 hover:scale-105 transition-transform"
        >
          +
        </button>
        {isModalOpen && (
          <EventModal
            onClose={() => setIsModalOpen(false)}
            onEventCreated={loadEvents}
            eventToEdit={selectedEvent}
          />
        )}
      </div>
    </div>
  );
}
