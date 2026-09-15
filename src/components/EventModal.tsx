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
    <div className="w-full h-full flex text-white bg-red-600 text-5xl">
      <div className="flex items-center justify-center">
        <form onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-white"
            placeholder="Title"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-white"
            placeholder="Description"
          />
          <input
            value={date}
            type="date"
            onChange={(e) => setDate(e.target.value)}
            className="border border-white"
            placeholder="Date"
          />

          <button
            type="button"
            onClick={onClose}
            className="text-3xl text-amber-300 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            // onClick={}
            className="text-3xl text-amber-300 cursor-pointer"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
