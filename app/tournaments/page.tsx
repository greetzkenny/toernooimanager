"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Tournaments() {
  const { data: session } = useSession();
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    fetch("/api/tournaments").then((res) => res.json()).then(setTournaments);
  }, []);

  const handleApply = async (tournamentId: string) => {
    if (!session) return;
    await fetch("/api/applications", {
      method: "POST",
      body: JSON.stringify({ tournamentId }),
    });
    // Refresh or show success
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Available Tournaments</h1>
      {tournaments.map((t: any) => (
        <div key={t.id} className="mb-4 p-4 border rounded">
          <h2>{t.name}</h2>
          <p>Start: {t.startDate}</p>
          <button onClick={() => handleApply(t.id)} className="mt-2 px-4 py-2 bg-green-500 text-white rounded">Apply</button>
        </div>
      ))}
    </div>
  );
} 