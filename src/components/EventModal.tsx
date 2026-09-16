"use client";

import { useState } from "react";

export default function EventModal({
  onClose,
  onEventCreated,
}: {
  onClose: () => void;
  onEventCreated: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const ConvertedDate = new Date(date).toISOString();

    const response = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, date: ConvertedDate }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage("Event created");
      //   The modal must be closes after click on "Save"
      //   and the event have been created
      onClose();
      onEventCreated();
    } else {
      setMessage(data.message);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col gap-4 shadow-lg px-6 py-9 rounded-lg bg-gray-800"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-600 border border-fuchsia-900 p-2 rounded-lg outline-none w-full"
          placeholder="Title"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-gray-600 border border-fuchsia-900 p-2 rounded-lg outline-none w-full"
          placeholder="Description"
        />
        <input
          value={date}
          type="date"
          onChange={(e) => setDate(e.target.value)}
          className="bg-gray-600 border border-fuchsia-900 p-2 rounded-lg outline-none w-full"
          placeholder="Date"
        />

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center py-2 px-3 rounded-lg bg-fuchsia-700 cursor-pointer md:hover:bg-fuchsia-800 hover:scale-105 transition-transform"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center justify-center py-2 px-3 rounded-lg bg-fuchsia-700 cursor-pointer md:hover:bg-fuchsia-800 hover:scale-105 transition-transform"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
