"use client";

import Header from "@/components/Header";
import { MONTHS } from "@/lib/months";
import { useEffect, useState } from "react";

const WEEKDAYS = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const daysWithEvents = new Set(
    events
      .filter((event) => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getUTCFullYear() === year &&
          eventDate.getUTCMonth() === month
        );
      })
      .map((event) => new Date(event.date).getUTCDate()),
  );

  async function loadEvents() {
    const response = await fetch("/api/events");
    const data = await response.json();
    setEvents(data.events);
  }

  useEffect(() => {
    loadEvents();
  }, []);

  function goToPreviousMonth() {
    setCurrentDate(new Date(year, month - 1, 1));
  }

  function goToNextMonth() {
    setCurrentDate(new Date(year, month + 1, 1));
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center gap-6 p-6">
        <div className="flex items-center gap-4">
          <button
            onClick={goToPreviousMonth}
            className="text-fuchsia-400 text-xl cursor-pointer hover:text-fuchsia-300 hover:scale-110 transition-transform"
          >
            ‹
          </button>
          <h2 className="text-fuchsia-400 text-4xl tracking-widest whitespace-nowrap font-(family-name:--font-bungee-shade)">
            {year} {MONTHS[month].toUpperCase()}
          </h2>
          <button
            onClick={goToNextMonth}
            className="text-fuchsia-400 text-xl cursor-pointer hover:text-fuchsia-300 hover:scale-110 transition-transform"
          >
            ›
          </button>
        </div>

        <div className="bg-gray-800 border border-fuchsia-900 rounded-lg p-4 grid grid-cols-7 gap-2 w-full max-w-2xl">
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              className="text-fuchsia-400 text-xs font-semibold text-center"
            >
              {day}
            </div>
          ))}
          {cells.map((day, index) => (
            <div
              key={index}
              className="relative aspect-square flex items-center justify-center text-white text-sm rounded-lg border border-fuchsia-900/40"
            >
              {day ?? ""}
              {day !== null && daysWithEvents.has(day) && (
                <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-fuchsia-500" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
