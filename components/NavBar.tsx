"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-green-600 to-green-700 dark:from-gray-800 dark:to-gray-900 shadow-lg border-b border-green-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">⚽</span>
              </div>
              <span className="text-white font-bold text-xl">Toernooi Manager</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link 
                href="/" 
                className="text-white hover:bg-green-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
              >
                Home
              </Link>
              
              {session ? (
                <>
                  <Link 
                    href="/dashboard" 
                    className="text-white hover:bg-green-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/tournaments" 
                    className="text-white hover:bg-green-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                  >
                    Tournaments
                  </Link>
                  {session.user.role === "ADMIN" && (
                    <>
                      <Link 
                        href="/admin/tournaments/new" 
                        className="text-white hover:bg-green-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                      >
                        Create Tournament
                      </Link>
                      <Link 
                        href="/admin/applications" 
                        className="text-white hover:bg-green-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                      >
                        Applications
                      </Link>
                    </>
                  )}
                  <button 
                    onClick={() => signOut()} 
                    className="text-white hover:bg-red-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/auth/signin" 
                    className="text-white hover:bg-green-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/auth/signup" 
                    className="bg-white text-green-600 hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-green-500 hover:bg-opacity-75 p-2 rounded-md transition-all duration-200"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-green-600 dark:bg-gray-800 rounded-b-lg">
              <Link 
                href="/" 
                className="text-white hover:bg-green-500 hover:bg-opacity-75 block px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              {session ? (
                <>
                  <Link 
                    href="/dashboard" 
                    className="text-white hover:bg-green-500 hover:bg-opacity-75 block px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/tournaments" 
                    className="text-white hover:bg-green-500 hover:bg-opacity-75 block px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Tournaments
                  </Link>
                  {session.user.role === "ADMIN" && (
                    <>
                      <Link 
                        href="/admin/tournaments/new" 
                        className="text-white hover:bg-green-500 hover:bg-opacity-75 block px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Create Tournament
                      </Link>
                      <Link 
                        href="/admin/applications" 
                        className="text-white hover:bg-green-500 hover:bg-opacity-75 block px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Applications
                      </Link>
                    </>
                  )}
                  <button 
                    onClick={() => signOut()} 
                    className="text-white hover:bg-red-500 hover:bg-opacity-75 block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/auth/signin" 
                    className="text-white hover:bg-green-500 hover:bg-opacity-75 block px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/auth/signup" 
                    className="bg-white text-green-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 