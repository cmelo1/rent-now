"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="text-xl font-bold text-slate-900">RentNow</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/browse"
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              Browse
            </Link>
            {user ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/account"
                  className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
                >
                  My Rentals
                </Link>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-500">{user.name}</span>
                  <button
                    onClick={logout}
                    className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/account/login"
                className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
              >
                Sign in
              </Link>
            )}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-slate-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-4 py-3 space-y-3">
            <Link
              href="/browse"
              className="block text-slate-600 hover:text-slate-900 font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Browse
            </Link>
            {user ? (
              <>
                <Link
                  href="/account"
                  className="block text-slate-600 hover:text-slate-900 font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  My Rentals
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="block text-slate-400 hover:text-slate-600 text-sm"
                >
                  Sign out ({user.name})
                </button>
              </>
            ) : (
              <Link
                href="/account/login"
                className="block bg-black text-white text-center px-4 py-2 rounded-lg text-sm font-medium"
                onClick={() => setMobileOpen(false)}
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
