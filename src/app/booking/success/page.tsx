"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id") ?? `bk-${Date.now()}`;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Checkmark */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-10 w-10 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-900">
            Booking Confirmed!
          </h1>
          <p className="text-sm text-slate-500">
            Your booking has been placed successfully.
          </p>
        </div>

        <div className="rounded-xl bg-white border border-slate-200 px-6 py-4">
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
            Booking ID
          </p>
          <p className="font-mono text-sm font-semibold text-slate-900">
            {bookingId}
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <Link
            href="/account"
            className="block w-full rounded-xl bg-black text-white py-3 text-sm font-semibold hover:bg-slate-800 transition-colors text-center"
          >
            View My Rentals
          </Link>
          <Link
            href="/browse"
            className="block w-full rounded-xl border border-slate-200 bg-white text-slate-900 py-3 text-sm font-semibold hover:bg-slate-50 transition-colors text-center"
          >
            Browse More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-2 border-slate-300 border-t-black rounded-full" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
