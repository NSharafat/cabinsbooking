import {
  HiArrowRightCircle,
  HiBanknotes,
  HiCalendarDays,
  HiHomeModern,
} from "react-icons/hi2";
import styled from "styled-components";

import Cabins from "./Cabins";
import State from "../UI/State";
import { formatCurrency } from "../Utilities/NumberFunctions";
import BookingSummary from "../UI/BookingSummary";
import BookingStates from "../UI/BookingStates";
import BookingComparison from "../UI/BookingComparison";
import PageHeader from "../UI/PageHeader";
import { H3 } from "../UI/FontStyles";
import Filter from "../UI/Filter";
import { useLatestBookings } from "../Booking/UseBooking";
import Spinner from "../UI/Spinner";
import {
  calculateBookingSummary,
  calculatecheckInSummary,
  CalculateEarnings,
  calculateOccupancyRate,
} from "../Utilities/StatesFunctions";

const DashboardWrapper = styled.div`
  height: 100%;
  max-width: 1000px;
  margin: auto auto;
`;

const PageBody = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
`;
const StatesWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;
  grid-column: span 4;
`;

const BookingInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column: span 4;
  grid-template-rows: 300px;
  gap: 1rem;
`;
const ComparisonWraper = styled.div`
  grid-column: span 4;
`;
const LoaderWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Dashboard() {
  const { bookings, isLoading } = useLatestBookings();
  if (isLoading)
    return (
      <LoaderWrapper>
        <Spinner />
      </LoaderWrapper>
    );

  return (
    <>
      {isLoading ? (
        <LoaderWrapper>
          <Spinner />
        </LoaderWrapper>
      ) : (
        <DashboardWrapper>
          <PageHeader>
            <H3>Dashboard</H3>
            <Filter
              filterField={"period"}
              options={[
                { value: "7-days", label: "7 Days" },
                { value: "30-days", label: "Last 30 days" },
                { value: "90-days", label: "Last 90 days" },
              ]}
            />
          </PageHeader>
          <PageBody>
            {console.log(CalculateEarnings(bookings))}
            <StatesWrapper>
              <State
                value={formatCurrency(Number(CalculateEarnings(bookings)))}
                title={"Earnings"}
                icon={HiBanknotes}
              />
              <State
                value={calculateBookingSummary(bookings)}
                title={"Bookings"}
                icon={HiCalendarDays}
              />
              <State
                value={calculatecheckInSummary(bookings)}
                title={"Checkins"}
                icon={HiArrowRightCircle}
              />
              <State
                value={`%${calculateOccupancyRate(bookings)}`}
                title={"Occupancy"}
                icon={HiHomeModern}
              />
            </StatesWrapper>
            <BookingInfo>
              <BookingSummary bookings={bookings} />
              <BookingStates bookings={bookings} />
            </BookingInfo>
            <ComparisonWraper>
              <BookingComparison bookings={bookings} />
            </ComparisonWraper>
          </PageBody>
        </DashboardWrapper>
      )}
    </>
  );
}

export default Dashboard;
