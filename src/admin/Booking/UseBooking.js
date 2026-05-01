import { useMutation, useQuery } from "@tanstack/react-query";
import { allBookings, checkIn, checkOut } from "../API/BookingCRUD";
import { useSearchParams } from "react-router-dom";
import { calculatePeriod } from "../Utilities/dateCalculator";
import { statusQuery } from "../Utilities/helpers";

export function useBooking() {
  const [searchParams] = useSearchParams();
  const statusFilter = searchParams.get("status") || "all";
  const periodFilter = searchParams.get("period") || "7-days";

  const status_Key = statusFilter === "all" ? "status_in" : "status";
  const filters = {
    [status_Key]: statusQuery(statusFilter),
    createdAt_gte:
      calculatePeriod(periodFilter) || (new Date().getDate() - 7).toISOString(),
  };
  console.log("filters", filters);
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings", statusFilter, periodFilter],
    queryFn: () => allBookings(filters),
  });

  return { bookings, isLoading };
}

export function useLatestBookings() {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("period") || "7-days";
  const period = calculatePeriod(filter) || new Date().getDate() - 7;
  const filters = { createdAt_gte: period };

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings", filter],
    queryFn: () => allBookings(filters),
  });

  return { bookings, isLoading };
}

export function useCheckOut() {
  const { mutate: checkOutApi, isPending } = useMutation({
    mutationFn: (booking) => checkOut(booking),
  });
  return { checkOutApi, isPending };
}

export function useCheckIn() {
  const { mutate: checkInApi, isPending } = useMutation({
    mutationFn: (breakfast, booking_id) => checkIn(breakfast, booking_id),
  });
  return { checkInApi, isPending };
}
