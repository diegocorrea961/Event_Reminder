"use client";

import { useState } from "react";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
}

export default function EventModal({
  onClose,
  onEventCreated,
  eventToEdit,
}: {
  onClose: () => void;
  onEventCreated: () => void;
  eventToEdit: Event | null;
}) {
  const [title, setTitle] = useState(eventToEdit?.title ?? "");
  const [description, setDescription] = useState(
    eventToEdit?.description ?? "",
  );
  const [date, setDate] = useState(
    eventToEdit ? eventToEdit.date.split("T")[0] : "",
  );
  const [message, setMessage] = useState(
    eventToEdit ? "Event edited" : "Event created",
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const ConvertedDate = new Date(date).toISOString();
    const url = eventToEdit ? `/api/events/${eventToEdit.id}` : "/api/events";
    const method = eventToEdit ? "PUT" : "POST";

    const response = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, date: ConvertedDate }),
    });

    //  --- O efeito acima é exatamente correspondente ao efeito debaixo ---
    // if (eventToEdit) {
    //   response = await fetch(`/api/events/${eventToEdit.id}`, {
    //     method: "PUT",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ title, description, date: ConvertedDate }),
    //   });
    // } else {
    //   response = await fetch("/api/events", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ title, description, date: ConvertedDate }),
    //   });
    // }

    const data = await response.json();
    if (response.ok) {
      setMessage(eventToEdit ? "Event edited" : "Event created");
      //   The modal must be closes after click on "Save"
      //   and the event have been created
      onEventCreated();
      onClose();
    } else {
      setMessage(data.message);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col gap-4 shadow-lg px-6 py-9 rounded-lg bg-zinc-800"
      >
        <h2 className="flex items-center justify-center text-amber-400 font-semibold text-3xl">
          {eventToEdit ? "Edit event" : "New event"}
        </h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-zinc-600 border border-amber-900 p-2 rounded-lg outline-none w-full"
          placeholder="Title"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-zinc-600 border border-amber-900 p-2 rounded-lg outline-none w-full"
          placeholder="Description"
        />
        <input
          value={date}
          type="date"
          onChange={(e) => setDate(e.target.value)}
          className="bg-zinc-600 border border-amber-900 p-2 rounded-lg outline-none w-full"
          placeholder="Date"
        />

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center py-2 px-3 rounded-lg bg-amber-700 cursor-pointer md:hover:bg-amber-800 hover:scale-105 transition-transform"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center justify-center py-2 px-3 rounded-lg bg-amber-700 cursor-pointer md:hover:bg-amber-800 hover:scale-105 transition-transform"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
