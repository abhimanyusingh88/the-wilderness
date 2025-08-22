import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { bookingId } = useParams();
  if (!bookingId) throw new Error("No booking ID provided");


  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ['booking', bookingId], // Include bookingId to prevent caching issues
    queryFn: () => getBooking(bookingId), // ✅ FIXED: Pass a function, not result
    retry: false,
  });

  return { isLoading, booking, error }; // ✅ FIXED: Return an object for correct destructuring
}
