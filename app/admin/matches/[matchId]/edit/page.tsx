"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";

export default function EditMatch() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const matchId = params?.matchId as string || '';
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);

  // Fetch current match data
  useEffect(() => {
    // Fetch match and set scores
  }, [matchId]);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/matches/${matchId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ team1Score, team2Score }),
    });
    if (res.ok) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Enter Match Results</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <input
          type="number"
          value={team1Score}
          onChange={(e) => setTeam1Score(parseInt(e.target.value))}
          placeholder="Team 1 Score"
          className="w-full p-2 mb-4 border rounded text-black"
          required
        />
        <input
          type="number"
          value={team2Score}
          onChange={(e) => setTeam2Score(parseInt(e.target.value))}
          placeholder="Team 2 Score"
          className="w-full p-2 mb-4 border rounded text-black"
          required
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Save Results</button>
      </form>
    </div>
  );
} 