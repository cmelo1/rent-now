"use client";

import { BookingConfig } from "@/lib/types";
import { items } from "@/data/items";
import { formatCurrency, formatDate } from "@/lib/pricing";
import Image from "next/image";

interface BookingSummaryProps {
  bookingConfig: BookingConfig;
}

export default function BookingSummary({ bookingConfig }: BookingSummaryProps) {
  const item = items.find((i) => i.id === bookingConfig.itemId);

  if (!item) {
    return (
      <div className="rounded-xl border border-slate-200 p-6">
        <p className="text-slate-500">Item not found</p>
      </div>
    );
  }

  const rentalCost = bookingConfig.totalCost;
  const deposit = bookingConfig.deposit;
  const total = rentalCost + deposit;

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      {/* Item Info */}
      <div className="flex gap-4 p-6 border-b border-slate-100">
        <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100">
          <Image
            src={item.images[0]}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-slate-900 truncate">{item.name}</h3>
          <p className="text-sm text-slate-500 mt-1">{item.location}</p>
          <span className="inline-block mt-2 rounded-full bg-slate-100 px-3 py-0.5 text-xs font-medium text-slate-700 capitalize">
            {bookingConfig.billingMode} billing
          </span>
        </div>
      </div>

      {/* Dates */}
      <div className="p-6 border-b border-slate-100 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Start</span>
          <span className="font-medium text-slate-900">
            {formatDate(bookingConfig.startDate)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">End</span>
          <span className="font-medium text-slate-900">
            {formatDate(bookingConfig.endDate)}
          </span>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="p-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Rental cost</span>
          <span className="text-slate-900">{formatCurrency(rentalCost)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Security deposit</span>
          <span className="text-slate-900">{formatCurrency(deposit)}</span>
        </div>
        <div className="border-t border-slate-100 pt-3 flex justify-between">
          <span className="font-semibold text-slate-900">Total</span>
          <span className="font-semibold text-slate-900">
            {formatCurrency(total)}
          </span>
        </div>
      </div>
    </div>
  );
}
