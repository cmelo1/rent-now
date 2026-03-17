"use client";

import { Suspense, useState, useEffect, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-slate-300 border-t-black rounded-full animate-spin" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const { user, login, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/account";

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoading && user) {
      router.replace(redirect);
    }
  }, [user, isLoading, redirect, router]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    const success = login(email.trim());
    if (success) {
      router.push(redirect);
    } else {
      setError("Unable to sign in. Please try again.");
    }
  };

  if (isLoading || user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-slate-300 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8">
          <h1 className="text-2xl font-bold text-slate-900 text-center">
            Sign in to RentNow
          </h1>
          <p className="text-slate-500 text-center mt-2 text-sm">
            Enter your email to continue
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-slate-400 transition-colors"
                autoFocus
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-slate-800 transition-colors"
            >
              Continue
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-6">
            Try: <span className="text-slate-600 font-medium">demo@rentnow.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}
