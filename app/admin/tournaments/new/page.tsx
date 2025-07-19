"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function NewTournament() {
  const { data: session } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [matchDuration, setMatchDuration] = useState(15);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/tournaments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, startDate, matchDuration }),
    });
    if (res.ok) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Create New Tournament</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tournament Name"
          className="w-full p-2 mb-4 border rounded text-black"
          required
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full p-2 mb-4 border rounded text-black"
          required
        />
        <input
          type="number"
          value={matchDuration}
          onChange={(e) => setMatchDuration(parseInt(e.target.value))}
          placeholder="Match Duration (minutes)"
          min={15}
          max={20}
          className="w-full p-2 mb-4 border rounded text-black"
          required
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Create</button>
      </form>
    </div>
  );
} 