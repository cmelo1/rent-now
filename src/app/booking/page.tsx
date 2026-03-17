"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Booking } from "@/lib/types";
import BookingSummary from "@/components/booking/BookingSummary";
import MockPaymentForm from "@/components/booking/MockPaymentForm";

export default function BookingPage() {
  const router = useRouter();
  const { bookingConfig, addBooking, clearBookingConfig } = useCart();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;
    if (!bookingConfig) {
      router.replace("/browse");
      return;
    }
    if (!user) {
      router.replace("/account/login?redirect=/booking");
    }
  }, [bookingConfig, user, isLoading, router]);

  if (isLoading || !bookingConfig || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin h-8 w-8 border-2 border-slate-300 border-t-black rounded-full" />
      </div>
    );
  }

  const handleConfirm = () => {
    const booking: Booking = {
      id: `bk-${Date.now()}`,
      itemId: bookingConfig.itemId,
      userId: user.id,
      startDate: bookingConfig.startDate,
      endDate: bookingConfig.endDate,
      billingMode: bookingConfig.billingMode,
      totalCost: bookingConfig.totalCost,
      deposit: bookingConfig.deposit,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    addBooking(booking);
    clearBookingConfig();
    router.push(`/booking/success?id=${booking.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-bold text-slate-900 mb-8">
          Confirm Your Booking
        </h1>

        <div className="grid gap-6 md:grid-cols-5">
          {/* Summary - wider */}
          <div className="md:col-span-3">
            <BookingSummary bookingConfig={bookingConfig} />
          </div>

          {/* Payment */}
          <div className="md:col-span-2">
            <MockPaymentForm onConfirm={handleConfirm} />
          </div>
        </div>
      </div>
    </div>
  );
}
