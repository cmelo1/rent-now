"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/browse?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/browse");
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Rent anything,
            <br />
            <span className="text-brand">anytime.</span>
          </h1>
          <p className="text-lg text-slate-300 mb-8">
            Tools, gear, electronics, and more — from people near you.
            <br className="hidden sm:block" />
            Pick your item, set your time, and go.
          </p>
          <form onSubmit={handleSearch} className="max-w-lg mx-auto">
            <div className="flex bg-white rounded-xl overflow-hidden shadow-lg">
              <input
                type="text"
                placeholder="What do you need to rent?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 px-5 py-4 text-slate-900 placeholder-slate-400 text-base outline-none"
              />
              <button
                type="submit"
                className="bg-black text-white px-6 py-4 font-medium hover:bg-slate-800 transition-colors whitespace-nowrap"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
