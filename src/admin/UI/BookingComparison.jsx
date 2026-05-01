import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styled from "styled-components";
import { calculateAreaChartData } from "../Utilities/StatesFunctions";
import { useSearchParams } from "react-router-dom";
import { date } from "zod";
import Empty from "./Empty";

const ChartWrapper = styled.div`
  font-size: small;
  background-color: var(--color-primary-50);
  padding: 2rem 0rem;
`;
function BookingComparison({ bookings }) {
  const [searchParams] = useSearchParams();
  const data = calculateAreaChartData(
    bookings,
    searchParams.get("period") || "7-days",
  );
  if (bookings.length === 0) {
    return <Empty />;
  }
  return (
    <ChartWrapper>
      <ResponsiveContainer width={`${100}%`} height={400}>
        <AreaChart data={data}>
          <YAxis dataKey={"Revenue"} />
          <XAxis dataKey={"date"} />
          <Tooltip formatter={(value) => `$${value}`} />
          <Area
            type="monotone"
            dataKey="Revenue"
            stroke="var(--color-secondary-400)"
            fill="var(--color-secondary-300)"
          />
          <Area
            type="monotone"
            dataKey="Breakfast"
            stroke="var(--color-primary-400)"
            fill="var(--color-primary-100)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}

export default BookingComparison;
