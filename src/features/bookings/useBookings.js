import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { getCabins } from "../../services/apiCabins";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams]= useSearchParams();
  const filterValue=searchParams.get("status");
  const queryClient=useQueryClient();
  // filtering
  const filter=!filterValue|| filterValue==='all'?null:{field:"status",value:filterValue};
  // sorting starts from here
  const sortByRaw= searchParams.get("sortBy")|| "startDate-desc";
  const [field,direction]= sortByRaw.split("-");
  const sortBy={field,direction};
  //pagination 
  const Page = Number(searchParams.get("page")) || 1;

  const { isLoading, data: {data:bookings,count}={} } = useQuery({
    queryKey: ['bookings',filter,sortBy,Page],
    queryFn:()=> getBookings({filter,sortBy,Page})
  });
  // prefetching (fetch before render) (here for pagination)
  const pageCount= Math.ceil(count/10);
   if(Page<pageCount)
  queryClient.prefetchQuery({
    queryKey: ['bookings',filter,sortBy,Page+1],
    queryFn:()=> getBookings({Page:Page+1})
  })
  // we can prefetch every kind of data but its best use in this case
  if(Page>1)
  queryClient.prefetchQuery({
    queryKey: ['bookings',filter,sortBy,Page-1],
    queryFn:()=> getBookings({Page:Page-1})
  })
  // ✅ Returning as an object now (more readable, no change to comments)
  return { isLoading, bookings ,count};
}
