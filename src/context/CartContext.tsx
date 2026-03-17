"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { BookingConfig, Booking } from "@/lib/types";

interface CartContextType {
  bookingConfig: BookingConfig | null;
  setBookingConfig: (config: BookingConfig) => void;
  clearBookingConfig: () => void;
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [bookingConfig, setBookingConfigState] = useState<BookingConfig | null>(
    null
  );
  const [bookings, setBookings] = useState<Booking[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("rentnow_bookings");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const setBookingConfig = (config: BookingConfig) => {
    setBookingConfigState(config);
  };

  const clearBookingConfig = () => {
    setBookingConfigState(null);
  };

  const addBooking = (booking: Booking) => {
    const updated = [booking, ...bookings];
    setBookings(updated);
    localStorage.setItem("rentnow_bookings", JSON.stringify(updated));
  };

  return (
    <CartContext.Provider
      value={{
        bookingConfig,
        setBookingConfig,
        clearBookingConfig,
        bookings,
        addBooking,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
