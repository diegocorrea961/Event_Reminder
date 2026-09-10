"use client";

import { useEffect, useState } from "react";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function loadEvents() {
      const response = await fetch("/api/events");
      const data = await response.json();
      setEvents(data.events);
    }
    loadEvents();
  }, []);

  return (
    <div>
      {events.map((event) => (
        <div key={event.id}>
          <p>{event.title}</p>
        </div>
      ))}
    </div>
  );
}
