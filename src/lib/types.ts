export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  itemCount: number;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  category: string;
  images: string[];
  hourlyRate: number;
  dailyRate: number;
  deposit: number;
  rating: number;
  reviewCount: number;
  available: boolean;
  location: string;
  owner: string;
  specs: Record<string, string>;
}

export interface Booking {
  id: string;
  itemId: string;
  userId: string;
  startDate: string;
  endDate: string;
  billingMode: "hourly" | "daily";
  totalCost: number;
  deposit: number;
  status: "pending" | "active" | "completed" | "cancelled";
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface BookingConfig {
  itemId: string;
  startDate: string;
  endDate: string;
  billingMode: "hourly" | "daily";
  totalCost: number;
  deposit: number;
}
