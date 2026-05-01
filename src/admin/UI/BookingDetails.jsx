import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { PersonelDetails } from "./GuestDetails";
import Button from "./Button";
import { HiChevronLeft } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { formatCurrency } from "../Utilities/NumberFunctions";
import toast from "react-hot-toast";
import { useBooking, useCheckIn, useCheckOut } from "../Booking/UseBooking";
import { useQueryClient } from "@tanstack/react-query";

const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  border: 1px solid #eee;
  border-radius: 10px;
  background-color: var(--color-primary-50);
  font-size: small;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 1rem 1.5rem;
`;

const HeaderRow = styled.div`
  font-size: x-large;
  background-color: var(--color-secondary-500);
  color: var(--text-light);
  padding: 1rem 1.5rem;
  display: grid;
  grid-template-columns: 1fr auto;
  span:last-child {
    font-size: small;
  }
  div:last-child {
    text-align: right;
  }
`;
const HeaderButtonWrapper = styled.div`
  max-width: 800px;
  margin: 20px auto;
  display: grid;
  grid-template-rows: 1fr;
  justify-content: right;
`;
const Actions = styled.div`
  margin-top: 1rem;
  display: flex;
  grid-column: span 2;
  gap: 10px;
  justify-content: flex-end;
`;

const InvoiceHeading = styled.h1`
  padding-left: 1.5rem;
  font-size: large;
`;
const Subdetails = styled.div`
  display: flex;
  flex-direction: column;
  font-size: medium;
  color: var(--color-primary-800);
  span:last-child {
    font-size: small;
  }
`;
const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1rem;
  margin: 1rem 1.5rem;
`;
const CheckBox = styled.input.attrs({ type: "checkbox" })`
  height: 1.2rem;
  width: 1.2rem;
  accent-color: var(--color-secondary-500);
`;
const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background-color: var(--color-primary-700);
  color: var(--text-light);
  font-weight: 600;
`;

export default function BookingDetails() {
  const [total, setTotal] = useState(0);
  const [breakfast, setBreakFast] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { bookings, isLoading } = useBooking();
  const { checkOutApi, isPending } = useCheckOut();
  const { checkInApi } = useCheckIn();
  const [confirmPayment, setConfirmPayment] = useState(false);
  const booking = bookings?.find((b) => Number(b.id) === Number(id));

  useEffect(() => {
    const calculate = () => {
      if (breakfast) {
        setTotal(booking?.price + Number(booking?.guests) * 30);
      } else {
        setTotal(booking?.price);
      }
    };
    calculate();
  }, [breakfast]);

  if (!booking) return <p>Booking not found</p>;
  return (
    <>
      <HeaderButtonWrapper>
        <Button variation={"primary"} onClick={() => navigate(-1)}>
          <HiChevronLeft /> <div>Back</div>
        </Button>
      </HeaderButtonWrapper>
      <Container>
        <InvoiceHeading>Booking Invoice #{booking?.id}</InvoiceHeading>

        <HeaderRow>
          <PersonelDetails>
            <span>{booking.fullName}</span>
            <span>{booking.email}</span>
          </PersonelDetails>
          <PersonelDetails>
            <span>{booking.guests}</span>
            <span>{booking.checkInDate}</span>
          </PersonelDetails>
        </HeaderRow>
        <Row>
          <Subdetails>
            <span>Country:</span>
            <span>{booking.country}</span>
          </Subdetails>

          <Subdetails>
            <span>NID:</span>
            <span>{booking.nid}</span>
          </Subdetails>
          <Subdetails>
            <span>Cabin:</span>
            <span>{booking.cabinId}</span>
          </Subdetails>
        </Row>
        <Row>
          <Subdetails>
            <span>Check-in:</span>
            <span>{booking?.checkInDate}</span>
          </Subdetails>
          <Subdetails>
            <span>Check-out:</span>
            <span>{booking?.checkOutDate}</span>
          </Subdetails>
          <Subdetails>
            <span>Status:</span>
            <span>{booking?.status}</span>
          </Subdetails>
        </Row>
        {(booking.status === "checked-in" ||
          booking.status === "checked-out") && (
          <Row>
            <Subdetails>
              <span>Breakfast:</span>
              <span>
                Break fast {booking.breakfastIncluded ? "" : " not "} included
                for {booking.breakfastIncluded ? booking.guests : ""} guest(s).
              </span>
            </Subdetails>

            <Subdetails>
              <span>Payment:</span>

              <span>
                The Amount of{" "}
                {formatCurrency(
                  booking.price +
                    (booking.breakfastIncluded ? booking.guests * 30 : 0),
                )}{" "}
                has been paid.
              </span>
            </Subdetails>
          </Row>
        )}
        {booking.status !== "checked-in" && booking.status !== "checked-out" ? (
          <CheckBoxWrapper>
            <CheckBox
              type="checkbox"
              id="breakfast"
              checked={breakfast}
              onChange={() => setBreakFast((breakfast) => !breakfast)}
              name="breakfast"
            />
            <label htmlFor="breakfast">
              Include breakfast for extra $30 per round
            </label>
          </CheckBoxWrapper>
        ) : (
          ""
        )}
        <FooterRow>
          <span>Total:</span>
          <span>
            ${total > 0 ? total : booking?.price}{" "}
            {breakfast && (
              <span> ({formatCurrency(booking?.guests * 30)})</span>
            )}
          </span>
        </FooterRow>
        {booking.status !== "checked-in" && booking.status !== "checked-out" ? (
          <CheckBoxWrapper>
            <CheckBox
              type="checkbox"
              id="confirmPayment"
              checked={confirmPayment}
              onChange={() =>
                setConfirmPayment((confirmPayment) => !confirmPayment)
              }
              name="confirmPayment"
            />
            <label htmlFor="confirmPayment">
              I confirm that the payment has been received
            </label>
          </CheckBoxWrapper>
        ) : (
          ""
        )}

        <Row>
          <div></div>

          {booking.status !== "checked-out" && (
            <Actions>
              <Button
                variation="secondary"
                type="button"
                onClick={() => {
                  const toastId = toast.loading("Checking out...");
                  checkOutApi(
                    { booking },
                    {
                      onSuccess: () => {
                        toast.success("Checked out successfully!", {
                          id: toastId,
                        });
                        queryClient.invalidateQueries({
                          queryKey: ["bookings"],
                        });
                      },
                      onError: (error) => {
                        toast.error(`Error checking out.${error.message}`, {
                          id: toastId,
                        });
                      },
                    },
                  );
                }}
              >
                Check Out
              </Button>

              {booking?.status === "unconfirmed" && (
                <Button
                  variation="primary"
                  disabled={!confirmPayment}
                  type="button"
                  onClick={() => {
                    const toastId = toast.loading("checking in...");
                    checkInApi(
                      { breakfast, booking_id: booking?.id },
                      {
                        onSuccess: () => {
                          queryClient.invalidateQueries({
                            queryKey: ["bookings"],
                          });
                          toast.success("Checked in success!", { id: toastId });
                        },
                        onError: () => {
                          toast.error("An error occured", { id: toastId });
                        },
                      },
                    );
                  }}
                >
                  Check in
                </Button>
              )}
            </Actions>
          )}
        </Row>
      </Container>
    </>
  );
}
