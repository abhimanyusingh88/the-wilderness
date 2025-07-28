import { useQuery } from "@tanstack/react-query";
// import { getCabins } from "../../services/apiCabins";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams]= useSearchParams();
  const filterValue=searchParams.get("status");
  // filtering
  const filter=!filterValue|| filterValue==='all'?null:{field:"status",value:filterValue};
  // sorting starts from here
  const sortByRaw= searchParams.get("sortBy")|| "startDate-desc";
  const [field,direction]= sortByRaw.split("-");
  const sortBy={field,direction};
  const { isLoading, data: bookings } = useQuery({
    queryKey: ['bookings',filter,sortBy],
    queryFn:()=> getBookings({filter,sortBy})
  });

  // ✅ Returning as an object now (more readable, no change to comments)
  return { isLoading, bookings };
}
