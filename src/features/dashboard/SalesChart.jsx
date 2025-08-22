import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import Heading from "../../ui/Heading";
import DashboardBox from "./DashboardBox";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;
  overflow-x: auto;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  & .recharts-surface {
    stroke: none;
  }
`;

// Helper: format date as "Aug 21" etc.
const formatDate = (dateObj) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const day = dateObj.getDate();
  const month = monthNames[dateObj.getMonth()];
  return `${month} ${day}`;
};

function SalesChart() {
  const { bookings, isLoading } = useRecentBookings();

  const [darkMode, setDarkMode] = useState(
    document.body.classList.contains("dark-mode")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDarkMode(document.body.classList.contains("dark-mode"));
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const data = useMemo(() => {
    if (!bookings) return [];

    return bookings
      .map((b) => {
        const dateObj = new Date(b.created_at);
        return {
          date: dateObj,
          label: formatDate(dateObj),
          totalSales: b.totalPrice,
          extrasSales: b.extrasPrice,
        };
      })
      .sort((a, b) => a.date - b.date);
  }, [bookings]);

  if (isLoading) return <Spinner />;

  const chartWidth = Math.max(data.length * 80, 800);
  const startDate = data.length > 0 ? formatDate(data[0].date) : null;
  const endDate = data.length > 0 ? formatDate(data[data.length - 1].date) : null;

  const colors = darkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
      };

  return (
    <StyledSalesChart>
      <Heading as="h3">
        Sales{" "}
        {startDate && endDate ? `from ${startDate} to ${endDate}` : ""}
      </Heading>

      <div style={{ width: chartWidth, height: 300 }}>
        <AreaChart width={chartWidth} height={330} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" stroke={colors.text} />
          <YAxis stroke={colors.text} tickFormatter={(val) => `$${val}`} />
          <Tooltip formatter={(val) => `$${val}`} />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
          />
        </AreaChart>
      </div>
    </StyledSalesChart>
  );
}

export default SalesChart;
