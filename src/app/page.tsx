"use client";

import EventModal from "@/components/EventModal";
import { useEffect, useState } from "react";
import ConfirmDeleteEvent from "@/components/ConfirmDeleteEvent";
import Header from "@/components/Header";
import { MONTHS } from "@/lib/months";
import { isSameUTCMonth } from "@/lib/dates";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  async function handleDeleteReload() {
    if (eventToDelete) {
      await handleDelete(eventToDelete.id);
      await loadEvents();
      setEventToDelete(null);
    } else {
      return "Anyone event was selected";
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const monthEvents = events.filter((event) =>
    isSameUTCMonth(new Date(event.date), currentYear, currentMonth),
  );

  return (
    <div className="min-h-screen flex flex-col bg-zinc-900">
      <Header />
      <div className="w-full flex-1 flex flex-col items-center justify-center gap-6 p-6">
        {events.length === 0 ? (
          <p className="text-zinc-300 text-center max-w-sm">
            Você ainda não tem eventos cadastrados. Toque em + para criar o
            primeiro.
          </p>
        ) : monthEvents.length === 0 ? (
          <p className="text-zinc-300 text-center max-w-sm">
            Você ainda não tem eventos em {MONTHS[currentMonth]}. Toque em +
            para adicionar.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full max-w-7xl">
            {monthEvents.map((event) => (
              <div
                key={event.id}
                className="bg-zinc-800 shadow-2xl rounded-lg p-3 border border-amber-800 cursor-pointer"
                onClick={() => {
                  setSelectedEvent(event);
                  setIsModalOpen(true);
                }}
              >
                <p className="text-lg font-bold text-white">{event.title}</p>
                <p className="text-sm text-zinc-300">{event.description}</p>
                <p className="text-sm text-amber-400 mt-2">{event.date}</p>
                <p
                  onClick={(e) => {
                    e.stopPropagation();
                    setEventToDelete(event);
                  }}
                  className="flex items-center justify-end mt-3 text-xl md:hover:text-red-500"
                >
                  🗑
                </p>
              </div>
            ))}
          </div>
        )}

        {eventToDelete && (
          <ConfirmDeleteEvent
            onConfirm={handleDeleteReload}
            onCancel={() => setEventToDelete(null)}
          />
        )}
        <button
          onClick={() => {
            setSelectedEvent(null);
            setIsModalOpen(true);
          }}
          className="text-white py-3 px-5 text-2xl cursor-pointer shadow-lg rounded-full bg-amber-800 md:hover:bg-amber-900 fixed bottom-6 right-6 hover:scale-105 transition-transform"
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
