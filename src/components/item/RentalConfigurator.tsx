"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Item } from "@/lib/types";
import {
  calculateRentalCost,
  getSuggestedMode,
  formatCurrency,
} from "@/lib/pricing";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function RentalConfigurator({ item }: { item: Item }) {
  const router = useRouter();
  const { setBookingConfig } = useCart();
  const { user } = useAuth();

  const [billingMode, setBillingMode] = useState<"hourly" | "daily">("daily");

  // Default start: tomorrow 9am, end: day after 9am
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(9, 0, 0, 0);
  const dayAfter = new Date(tomorrow);
  dayAfter.setDate(dayAfter.getDate() + 1);

  const formatForInput = (d: Date) => {
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const [startDate, setStartDate] = useState(formatForInput(tomorrow));
  const [endDate, setEndDate] = useState(formatForInput(dayAfter));

  const start = new Date(startDate);
  const end = new Date(endDate);
  const isValid = end > start;

  const totalCost = useMemo(() => {
    if (!isValid) return 0;
    return calculateRentalCost(
      start,
      end,
      item.hourlyRate,
      item.dailyRate,
      billingMode
    );
  }, [startDate, endDate, billingMode, item.hourlyRate, item.dailyRate, isValid]);

  const suggestion = useMemo(() => {
    if (!isValid) return null;
    return getSuggestedMode(start, end, item.hourlyRate, item.dailyRate);
  }, [startDate, endDate, item.hourlyRate, item.dailyRate, isValid]);

  const handleRentNow = () => {
    if (!isValid) return;
    setBookingConfig({
      itemId: item.id,
      startDate,
      endDate,
      billingMode,
      totalCost,
      deposit: item.deposit,
    });
    if (!user) {
      router.push("/account/login?redirect=/booking");
    } else {
      router.push("/booking");
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-baseline gap-2 mb-6">
        <span className="text-2xl font-bold text-slate-900">
          {formatCurrency(item.hourlyRate)}
        </span>
        <span className="text-slate-400">/hr</span>
        <span className="text-slate-300 mx-1">|</span>
        <span className="text-2xl font-bold text-slate-900">
          {formatCurrency(item.dailyRate)}
        </span>
        <span className="text-slate-400">/day</span>
      </div>

      {/* Billing mode toggle */}
      <div className="flex bg-slate-100 rounded-lg p-1 mb-5">
        <button
          onClick={() => setBillingMode("hourly")}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
            billingMode === "hourly"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500"
          }`}
        >
          Hourly
        </button>
        <button
          onClick={() => setBillingMode("daily")}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
            billingMode === "daily"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500"
          }`}
        >
          Daily
        </button>
      </div>

      {/* Date pickers */}
      <div className="space-y-3 mb-5">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Start
          </label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 outline-none focus:border-brand focus:ring-1 focus:ring-brand"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            End
          </label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate}
            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 outline-none focus:border-brand focus:ring-1 focus:ring-brand"
          />
        </div>
      </div>

      {!isValid && startDate && endDate && (
        <p className="text-red-500 text-sm mb-4">
          End date must be after start date.
        </p>
      )}

      {/* Suggestion */}
      {suggestion && suggestion.mode !== billingMode && suggestion.savings > 1 && (
        <button
          onClick={() => setBillingMode(suggestion.mode)}
          className="w-full text-left bg-blue-50 text-blue-700 text-sm px-4 py-3 rounded-lg mb-5"
        >
          Switch to {suggestion.mode} billing to save{" "}
          {formatCurrency(suggestion.savings)}
        </button>
      )}

      {/* Cost breakdown */}
      <div className="border-t border-slate-100 pt-4 mb-5 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Rental cost</span>
          <span className="text-slate-900">{formatCurrency(totalCost)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Refundable deposit</span>
          <span className="text-slate-900">
            {formatCurrency(item.deposit)}
          </span>
        </div>
        <div className="flex justify-between font-bold text-base border-t border-slate-100 pt-2">
          <span>Total</span>
          <span>{formatCurrency(totalCost + item.deposit)}</span>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={handleRentNow}
        disabled={!isValid || !item.available}
        className="w-full bg-black text-white py-3.5 rounded-xl font-semibold text-base hover:bg-slate-800 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
      >
        {!item.available
          ? "Currently Unavailable"
          : `Rent Now — ${formatCurrency(totalCost + item.deposit)}`}
      </button>
    </div>
  );
}
