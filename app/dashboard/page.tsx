"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {session.user.email}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Manage your tournaments and applications
          </p>
        </div>

        {/* Role-based Content */}
        {session.user.role === "ADMIN" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Admin Dashboard Cards */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🏆</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create Tournament</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Set up new tournaments</p>
                </div>
              </div>
              <Link 
                href="/admin/tournaments/new" 
                className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white text-center py-3 px-4 rounded-lg font-medium transition-colors duration-200"
              >
                Create New Tournament
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">📋</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Applications</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Review team applications</p>
                </div>
              </div>
              <Link 
                href="/admin/applications" 
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 px-4 rounded-lg font-medium transition-colors duration-200"
              >
                View Applications
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">⚽</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tournaments</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Manage existing tournaments</p>
                </div>
              </div>
              <Link 
                href="/tournaments" 
                className="block w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-3 px-4 rounded-lg font-medium transition-colors duration-200"
              >
                View Tournaments
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* User Dashboard Cards */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🏆</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Available Tournaments</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Browse and apply to tournaments</p>
                </div>
              </div>
              <Link 
                href="/tournaments" 
                className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white text-center py-3 px-4 rounded-lg font-medium transition-colors duration-200"
              >
                Browse Tournaments
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">My Applications</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Track your tournament applications</p>
                </div>
              </div>
              <Link 
                href="/applications" 
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 px-4 rounded-lg font-medium transition-colors duration-200"
              >
                View Applications
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">⚽</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Match Schedule</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">View upcoming matches</p>
                </div>
              </div>
              <Link 
                href="/matches" 
                className="block w-full bg-orange-600 hover:bg-orange-700 text-white text-center py-3 px-4 rounded-lg font-medium transition-colors duration-200"
              >
                View Matches
              </Link>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Overview</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-emerald-600">0</div>
              <div className="text-gray-600 dark:text-gray-400">Active Tournaments</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-blue-600">0</div>
              <div className="text-gray-600 dark:text-gray-400">Pending Applications</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-purple-600">0</div>
              <div className="text-gray-600 dark:text-gray-400">Total Teams</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-orange-600">0</div>
              <div className="text-gray-600 dark:text-gray-400">Upcoming Matches</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 