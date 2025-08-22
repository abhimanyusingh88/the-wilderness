import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from "react-icons/hi2";
import Stat from "./Stat";
import { HiOutlineCash } from "react-icons/hi";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmStays, numDays, cabinCount }) {
  //1. 
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const checkins = confirmStays.length;

  const occupancy =
    numDays > 0 && cabinCount > 0
      ? confirmStays.reduce((acc, curr) => acc + curr.numNights, 0) /
        (numDays * cabinCount)
      : 0;

const rate = Number((occupancy * 100).toFixed(2));


  return (
    <>
      <Stat title="Bookings" color="blue" icon={<HiOutlineBriefcase />} value={numBookings} />
      <Stat title="Sales" color="green" icon={<HiOutlineBanknotes />} value={formatCurrency(sales)} />
      <Stat title="Checkins" color="blue" icon={<HiOutlineCalendarDays />} value={checkins} />
      <Stat title="Occupancy" color="blue" icon={<HiOutlineChartBar />} value={`${rate}%`} />
    </>
  );
}

export default Stats;
