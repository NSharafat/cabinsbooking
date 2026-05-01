import React, { useRef, useState } from "react";
import ContentWrapper from "../UI/ContentWrapper";
import { H3 } from "../UI/FontStyles";
import { Table, TableHead, TableRow, TD } from "../UI/Table";
import Status from "../UI/Status";
import DotsButton from "../UI/DotsButton";
import TooltipMenu from "../UI/TooltipMenu";
import MenuItem from "../UI/MenuItem";
import IconButton from "../UI/IconLink";
import {
  HiOutlineArrowDownTray,
  HiOutlineArrowsPointingOut,
  HiOutlineArrowUpTray,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi2";
import Button from "../UI/Button";
import Note from "../UI/Note";
import { formatCurrency } from "../Utilities/NumberFunctions";
import showConfirmation from "../UI/Confirmation";
import GuestDetails, { PersonelDetails } from "../UI/GuestDetails";
import BookingDetails from "../UI/BookingDetails";
import { Link } from "react-router-dom";
import StyledLink from "../UI/StyledLink";
import { useBooking, useCheckOut } from "../Booking/UseBooking";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import Filter from "../UI/Filter";

import PageHeader from "../UI/PageHeader";

function Bookings() {
  const { bookings, isLoading } = useBooking();
  const { checkOutApi, isPending } = useCheckOut();
  const [open, setTooltipOpen] = useState(null);
  const querClient = useQueryClient();
  const menuref = useRef(null);
  console.log(bookings);
  return (
    <div>
      <ContentWrapper>
        <PageHeader>
          <H3>All Cabins/Bookings</H3>
          <Filter
            filterField={"status"}
            options={[
              { value: "all", label: "All" },
              { value: "unconfirmed", label: "Unconfirmed" },
              { value: "checked-in", label: "Checked in" },
              { value: "checked-out", label: "Checked out" },
            ]}
          />
          <Filter
            filterField={"period"}
            options={[
              { value: "7-days", label: "7 Days" },
              { value: "30-days", label: "Last 30 days" },
              { value: "90-days", label: "Last 90 days" },
            ]}
          />
        </PageHeader>

        <Table>
          <TableHead type="Header">
            <TD>Cabin Name</TD>
            <TD>Guest Details</TD>
            <TD>Cabin</TD>
            <TD>Price</TD>
            <TD>Status</TD>
            <TD>Actions</TD>
          </TableHead>
          <tbody>
            {bookings?.map((booking) => (
              <TableRow>
                <TD>{booking.country}</TD>
                <TD>
                  <GuestDetails>
                    <PersonelDetails>
                      <span>{booking.fullName}</span>
                      <span>{booking.email}</span>
                    </PersonelDetails>
                    <PersonelDetails>
                      <span>{booking.guests}</span>
                      <span>{booking.checkInDate}</span>
                    </PersonelDetails>
                  </GuestDetails>
                </TD>
                <TD>{booking.cabinId}</TD>
                <TD>{formatCurrency(booking.price)}</TD>
                <TD>
                  <Status type={booking.status}>{booking.status}</Status>
                </TD>
                <TD className="relative text-right">
                  <DotsButton
                    setOpen={setTooltipOpen}
                    index={booking.id}
                    menuref={menuref}
                  />
                  {open == booking.id && (
                    <TooltipMenu ref={menuref}>
                      <MenuItem>
                        <StyledLink to={`/bookings/${booking.id}`}>
                          <IconButton>
                            <HiOutlineEye /> View
                          </IconButton>
                        </StyledLink>
                      </MenuItem>

                      {booking.status === "checked-in" && (
                        <MenuItem
                          onClick={() => {
                            const toastId = toast.loading("Checking out...");
                            checkOutApi(
                              { booking },
                              {
                                onSuccess: () => {
                                  setTooltipOpen(null);
                                  toast.success("Checked out successfully!", {
                                    id: toastId,
                                  });
                                  querClient.invalidateQueries(["bookings"]);
                                },
                                onError: (error) => {
                                  toast.error(
                                    `Error checking out.${error.message}`,
                                    {
                                      id: toastId,
                                    },
                                  );
                                },
                              },
                            );
                          }}
                        >
                          <IconButton>
                            <HiOutlineArrowUpTray /> <span>Checkout</span>
                          </IconButton>
                        </MenuItem>
                      )}
                      {booking.status === "unconfirmed" && (
                        <MenuItem>
                          <StyledLink to={`/bookings/${booking.id}`}>
                            <IconButton>
                              <HiOutlineArrowDownTray /> Check in
                            </IconButton>
                          </StyledLink>
                        </MenuItem>
                      )}
                    </TooltipMenu>
                  )}
                </TD>
              </TableRow>
            ))}
          </tbody>
        </Table>
        <div className="flex flex-row items-center justify-between ">
          <Note>
            Available <b>{bookings?.length}</b> Cabins out of{" "}
            <b>{bookings?.length}</b>
          </Note>
          <Button type={"button"} variation={"primary"}>
            Add new cabin
          </Button>
        </div>
      </ContentWrapper>
    </div>
  );
}

export default Bookings;
