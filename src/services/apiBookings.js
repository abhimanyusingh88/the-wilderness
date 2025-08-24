import { getToday } from "../utils/helpers";
import supabase from "./supabase";

// ✅ FIXED: Now returns data properly
export async function getBookings({filter,sortBy,Page}) {
  let query=supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)",{count:"exact"});
  // const { data, error } = await 
  if(filter)
  {
    query= query.eq(filter.field,filter.value);
  }
  //sort
  if(sortBy)
  {
    query = query.order(sortBy.field,{ascending: sortBy.direction==="asc"});
  }
  const PAGE_SIZE=10;
  if(Page)
  {
    const from=  (Page-1)*PAGE_SIZE;
    const to= from+PAGE_SIZE-1;
    query= query.range(from,to)
  }

  // console.log(data);
  const { data, error,count } = await query;


  if (error) {
    console.log(error);
    throw new Error("Bookings could not be Loaded");
  }

  return {data,count}; // ✅ ADDED RETURN (previously missing)
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
import { endOfDay, formatISO } from "date-fns";

export async function getBookingsAfterDate(date) {
  const startDate = new Date(date); // make sure it's a Date object
  const endDate = endOfDay(new Date()); // end of today

  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", startDate.toISOString())
    .lte("created_at", endDate.toISOString());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}


// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq."${getToday()}"),and(status.eq.checked-in,endDate.eq."${getToday()}")`
    )
    .order("created_at");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}


export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
