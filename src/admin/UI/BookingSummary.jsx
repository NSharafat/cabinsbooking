import React from "react";
import styled from "styled-components";
import { Table, TableHead, TableRow, TD } from "./Table";
import GuestDetails, { PersonelDetails } from "./GuestDetails";
import DotsButton from "./DotsButton";
import { formatCurrency } from "../Utilities/NumberFunctions";
import Spinner from "./Spinner";
import Status from "./Status";
import Empty from "./Empty";

const StyledBooking = styled.div`
  font-size: x-small;
  overflow-y: auto;
  color: var(--color-primary-700);
  background-color: var(--color-primary-50);
`;
function BookingSummary({ bookings }) {
  if (bookings.length === 0) {
    return <Empty />;
  }
  return (
    <StyledBooking>
      <Table>
        <TableHead>
          <TD>Guest</TD>
          <TD>Cost</TD>
          <TD>Status</TD>
          <TD>Actions</TD>
        </TableHead>
        <tbody>
          {bookings?.map((booking) => {
            return (
              <TableRow>
                <TD>
                  <GuestDetails>
                    <PersonelDetails>
                      <span>{booking.fullName}</span>
                      <span>{booking.email}</span>
                    </PersonelDetails>
                    <PersonelDetails>
                      <span>{booking.guests}</span>
                      <span>{booking.checkOutDate}</span>
                    </PersonelDetails>
                  </GuestDetails>
                </TD>
                <TD>{formatCurrency(booking.price)}</TD>
                <TD>
                  <Status type={booking.status}>{booking.status}</Status>
                </TD>
                <TD>
                  <DotsButton />
                </TD>
              </TableRow>
            );
          })}
        </tbody>
      </Table>
    </StyledBooking>
  );
}

export default BookingSummary;
