"use client";

import { useState } from "react";

interface MockPaymentFormProps {
  onConfirm: () => void;
}

export default function MockPaymentForm({ onConfirm }: MockPaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onConfirm();
    }, 1000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-200 bg-white p-6 space-y-5"
    >
      <h3 className="font-semibold text-slate-900">Payment Details</h3>

      <div className="rounded-lg bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-500">
        Mock payment &mdash; no real charges will be made.
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Card number
          </label>
          <input
            type="text"
            readOnly
            value="4242 4242 4242 4242"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Expiry
            </label>
            <input
              type="text"
              readOnly
              value="12/28"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              CVV
            </label>
            <input
              type="text"
              readOnly
              value="123"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isProcessing}
        className="w-full rounded-xl bg-black text-white py-3 text-sm font-semibold hover:bg-slate-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            Processing...
          </span>
        ) : (
          "Confirm & Pay"
        )}
      </button>
    </form>
  );
}
