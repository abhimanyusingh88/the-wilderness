import styled from "styled-components";
import Heading from "../../ui/Heading";
import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip, Legend } from "recharts";

const ChartBox = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

// These colors are from the photo.
const startDataLight = [
  { duration: "1 night", value: 0, color: "#e36465" },
  { duration: "2 nights", value: 0, color: "#f87532" },
  { duration: "3 nights", value: 0, color: "#f7b539" },
  { duration: "4-5 nights", value: 0, color: "#87cb3b" },
  { duration: "6-7 nights", value: 0, color: "#2dca73" },
  { duration: "8-14 nights", value: 0, color: "#20bd9f" },
  { duration: "15-21 nights", value: 0, color: "#4789f2" },
  { duration: "21+ nights", value: 0, color: "#a855f7" },
];

function prepareData(startData, stays) {
  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, "1 night");
      if (num === 2) return incArrayValue(arr, "2 nights");
      if (num === 3) return incArrayValue(arr, "3 nights");
      if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
      if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
      if (num >= 21) return incArrayValue(arr, "21+ nights");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function DurationChart({ confirmedStays }) {
  console.log(confirmedStays);
  const data = prepareData(startDataLight, confirmedStays);

  return (
    <ChartBox>
      <Heading as="h3">Stay duration summary</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="duration"
            cx="40%"
            cy="50%"
            outerRadius={110} // Increased outerRadius for a thicker ring
            innerRadius={80} // Added innerRadius to create a donut chart
            paddingAngle={3} // Added paddingAngle for the gaps between segments
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            iconSize={12} // Adjusted iconSize to match the image
            iconType="circle" // Changed iconType to circle
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationChart;