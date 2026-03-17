export function calculateRentalCost(
  startDate: Date,
  endDate: Date,
  hourlyRate: number,
  dailyRate: number,
  billingMode: "hourly" | "daily"
): number {
  const diffMs = endDate.getTime() - startDate.getTime();
  if (diffMs <= 0) return 0;

  if (billingMode === "hourly") {
    const hours = Math.ceil(diffMs / (1000 * 60 * 60));
    return hours * hourlyRate;
  } else {
    const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return days * dailyRate;
  }
}

export function getSuggestedMode(
  startDate: Date,
  endDate: Date,
  hourlyRate: number,
  dailyRate: number
): { mode: "hourly" | "daily"; savings: number } | null {
  const hourlyCost = calculateRentalCost(
    startDate,
    endDate,
    hourlyRate,
    dailyRate,
    "hourly"
  );
  const dailyCost = calculateRentalCost(
    startDate,
    endDate,
    hourlyRate,
    dailyRate,
    "daily"
  );

  if (hourlyCost < dailyCost) {
    return { mode: "hourly", savings: dailyCost - hourlyCost };
  } else if (dailyCost < hourlyCost) {
    return { mode: "daily", savings: hourlyCost - dailyCost };
  }
  return null;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
