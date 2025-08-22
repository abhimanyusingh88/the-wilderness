import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import Spinner from "../../ui/Spinner";
import { useCabinTable } from "../cabins/useCabinTable";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading, bookings } = useRecentBookings();
  const { isLoading: isLoadingCabins, cabins } = useCabinTable();
  const {
    stays,
    confirmStays,
    isLoading: isLoadingStays,
    numDays,
  } = useRecentStays();

  // ✅ include cabins loading
  if (isLoading || isLoadingStays || isLoadingCabins) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings || []}
        confirmStays={confirmStays || []}
        numDays={numDays}
        cabinCount={cabins ? cabins.length : 0}
      />
      <DurationChart confirmedStays={confirmStays}/>
      <SalesChart />

    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
