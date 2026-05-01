import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
  maxRedirects: 0,
});

export async function checkIn({ breakfast, booking_id }) {
  console.log(breakfast, booking_id);
  try {
    const data = await api.patch(`/bookings/${booking_id}`, {
      status: "checked-in",
      breakfastIncluded: breakfast,
      payment: true,
    });

    return data;
  } catch (error) {
    //throw error;
    return error;
  }
}

export async function checkOut({ booking }) {
  try {
    const { data } = await api.patch(`/bookings/${booking.id}`, {
      ...booking,
      status: "checked-out",
    });
    return data;
  } catch (error) {
    return error;
  }
}
export async function allBookings(filters) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.append(key, value);
    }
  });
  const url = `/bookings?${params.toString()}`;
  console.log(url);

  const { data } = await api.get(url);
  return data;
}
