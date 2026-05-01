import React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import styled from "styled-components";
import { pieChartData } from "../Utilities/StatesFunctions";
import Empty from "./Empty";

const ChartWrapper = styled.div`
  font-size: small;
  background-color: var(--color-primary-50);
`;

function BookingStates({ bookings }) {
  const data = [
    { name: "Checked-in", value: pieChartData(bookings).checkedIn },
    { name: "Unconfirmed", value: pieChartData(bookings).unconfirmed },
    { name: "Checked-out", value: pieChartData(bookings).checkOut },
  ];

  const COLORS = [
    "var(--badge-green)",
    "var(--badge-warn)",
    "var(--badge-secondary)",
  ];
  if (bookings.length === 0) {
    return <Empty />;
  }
  return (
    <ChartWrapper>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="80%"
            outerRadius="100%"
            cx="50%"
            cy="60%"
            cornerRadius="10%"
            paddingAngle={1}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend
            layout="horizontal"
            align="center"
            wrapperStyle={{ paddingTop: "40px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}

export default BookingStates;
