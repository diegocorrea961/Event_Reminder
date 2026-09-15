"use client";

import EventModal from "@/components/EventModal";
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
    <div>
      {events.map((event) => (
        <div key={event.id}>
          <p>{event.title}</p>
          <p>{event.description}</p>
          <p>{event.date}</p>
        </div>
      ))}

      <button
        onClick={() => setIsModalOpen(true)}
        className="text-white text-3xl cursor-pointer"
      >
        OPEN MODAL
      </button>
      {isModalOpen && (
        <EventModal
          onClose={() => setIsModalOpen(false)}
          onEventCreated={loadEvents}
        />
      )}
    </div>
  );
}
