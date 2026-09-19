"use client";

import EventModal from "@/components/EventModal";
import { useEffect, useState } from "react";
import ConfirmDeleteEvent from "@/components/ConfirmDeleteEvent";
import Header from "@/components/Header";
import { MONTHS } from "@/lib/months";

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

  const monthEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getUTCFullYear() === currentYear &&
      eventDate.getUTCMonth() === currentMonth
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      <div className="w-full flex-1 flex items-center justify-center gap-6">
        {events.length === 0 ? (
          <p className="text-gray-300 text-center max-w-sm">
            Você ainda não tem eventos cadastrados. Toque em + para criar o
            primeiro.
          </p>
        ) : monthEvents.length === 0 ? (
          <p className="text-gray-300 text-center max-w-sm">
            Você ainda não tem eventos em {MONTHS[currentMonth]}. Toque em +
            para adicionar.
          </p>
        ) : (
          monthEvents.map((event) => (
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
                  setEventToDelete(event);
                }}
                className="flex items-center justify-end mt-3 text-xl md:hover:text-red-500"
              >
                🗑
              </p>
            </div>
          ))
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
