"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Tournament } from "@/types/shared";

export default function Tournaments() {
  const { data: session } = useSession();
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tournaments")
      .then((res) => res.json())
      .then((data) => {
        setTournaments(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleApply = async (tournamentId: string) => {
    if (!session) return;
    
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tournamentId }),
      });
      
      if (response.ok) {
        // Show success message or update UI
        alert("Application submitted successfully!");
      } else {
        alert("Failed to submit application. Please try again.");
      }
    } catch {
      alert("An error occurred. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading tournaments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Available Tournaments
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Browse and apply to football tournaments
          </p>
        </div>

        {/* Tournaments Grid */}
        {tournaments.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🏆</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No tournaments available
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Check back later for new tournaments or create one if you&apos;re an admin.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tournaments.map((tournament: Tournament) => (
              <div 
                key={tournament.id} 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Tournament Header */}
                <div className="bg-gradient-to-r from-green-600 to-green-700 dark:from-gray-700 dark:to-gray-600 p-6">
                  <Link href={`/tournaments/${tournament.id}`}>
                    <h2 className="text-xl font-bold text-white mb-2 hover:text-green-100 transition-colors duration-200">
                      {tournament.name}
                    </h2>
                  </Link>
                  <div className="flex items-center text-white/80 text-sm">
                    <span className="mr-4">📅 {new Date(tournament.startDate).toLocaleDateString()}</span>
                    <span>📍 {tournament.location}</span>
                  </div>
                </div>

                {/* Tournament Details */}
                <div className="p-6">
                  <div className="mb-4">
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      {tournament.description || "No description available"}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center">
                        <span className="text-gray-500 dark:text-gray-400 mr-2">👥</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          {tournament.maxTeams || "Unlimited"} teams
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-500 dark:text-gray-400 mr-2">🏟️</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          {tournament.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Link 
                      href={`/tournaments/${tournament.id}`}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white text-center py-2 px-4 rounded-lg font-medium transition-colors duration-200"
                    >
                      View Details
                    </Link>
                    {session && (
                      <button 
                        onClick={() => handleApply(tournament.id)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
                      >
                        Apply
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        {session?.user.role === "ADMIN" && (
          <div className="mt-12 text-center">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Create a New Tournament
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Set up a new football tournament and start accepting team applications.
              </p>
              <Link 
                href="/admin/tournaments/new"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center"
              >
                <span className="mr-2">🏆</span>
                Create Tournament
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 