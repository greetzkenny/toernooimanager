"use client";

import { useTheme } from "next-themes";
import Link from "next/link";

export default function Home() {
  const { setTheme } = useTheme();

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="flex min-h-screen flex-col items-center justify-center p-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="mb-12">
            <div className="mb-8">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <span className="text-4xl">⚽</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-2xl">
                Toernooi Manager
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90 drop-shadow-lg max-w-2xl mx-auto">
                Manage your football tournaments with ease! Create, organize, and track tournaments with our powerful platform.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link 
                href="/tournaments" 
                className="bg-white text-emerald-700 hover:bg-gray-50 px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Browse Tournaments
              </Link>
              <Link 
                href="/auth/signup" 
                className="bg-emerald-800 hover:bg-emerald-900 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white border border-white/20">
              <div className="text-3xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold mb-2">Tournament Management</h3>
              <p className="text-white/80">Create and manage tournaments with ease. Set schedules, track teams, and monitor progress.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white border border-white/20">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-2">Team Applications</h3>
              <p className="text-white/80">Teams can easily apply to tournaments. Admins can review and approve applications efficiently.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white border border-white/20">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Match Tracking</h3>
              <p className="text-white/80">Track match results, standings, and tournament progress in real-time.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 