"use client";

import Header from "@/components/Header";
import { MONTHS } from "@/lib/months";
import { getCalendarCells } from "@/lib/calendar";
import { isSameUTCMonth } from "@/lib/dates";
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

  const cells = getCalendarCells(year, month);

  const daysWithEvents = new Set(
    events
      .filter((event) => isSameUTCMonth(new Date(event.date), year, month))
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
    <div className="min-h-screen flex flex-col bg-zinc-900">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center gap-6 p-6">
        <div className="flex items-center justify-between w-full max-w-2xl">
          <button
            onClick={goToPreviousMonth}
            className="text-amber-400 text-xl cursor-pointer hover:text-amber-300 hover:scale-110 transition-transform"
          >
            ‹
          </button>
          <h2 className="text-amber-400 text-4xl tracking-widest whitespace-nowrap font-(family-name:--font-bungee-shade)">
            {year} {MONTHS[month].toUpperCase()}
          </h2>
          <button
            onClick={goToNextMonth}
            className="text-amber-400 text-xl cursor-pointer hover:text-amber-300 hover:scale-110 transition-transform"
          >
            ›
          </button>
        </div>

        <div className="bg-zinc-800 border border-amber-900 rounded-lg p-4 grid grid-cols-7 gap-2 w-full max-w-2xl">
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              className="text-amber-400 text-xs font-semibold text-center"
            >
              {day}
            </div>
          ))}
          {cells.map((day, index) => (
            <div
              key={index}
              className="relative h-16 flex items-center justify-center text-white text-sm rounded-lg border border-amber-900/40"
            >
              {day ?? ""}
              {day !== null && daysWithEvents.has(day) && (
                <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-amber-500" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
