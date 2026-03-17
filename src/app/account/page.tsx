"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import BookingCard from "@/components/booking/BookingCard";

export default function AccountPage() {
  const { user, logout, isLoading } = useAuth();
  const { bookings } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/account/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-slate-300 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  const userBookings = bookings.filter((b) => b.userId === user.id);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-full bg-slate-100 object-cover"
          />
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Hey, {user.name}
            </h1>
            <p className="text-sm text-slate-500">{user.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
        >
          Sign out
        </button>
      </div>

      {/* Bookings */}
      <section>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Your Rentals
        </h2>

        {userBookings.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
            <p className="text-slate-500">No rentals yet</p>
            <Link
              href="/browse"
              className="inline-block mt-4 bg-black text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors"
            >
              Browse items
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {userBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
