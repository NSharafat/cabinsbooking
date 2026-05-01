const TOTAL_CABINS = 12;

export function CalculateEarnings(bookings) {
  console.log(bookings);
  return bookings.reduce(
    (total, booking) => {
      if (booking.status === "checked-out" || booking.status === "checked-in") {
        if (booking.breakfastIncluded) {
          return total + Number(booking.price) + 30 * Number(booking.guests);
        }
        return total + Number(booking.price);
      }
      return total;
    },

    0,
  );
}
export function calculateBookingSummary(bookings) {
  const summary = bookings.length;
  return summary;
}

export function calculatecheckInSummary(bookings) {
  const summary = bookings.filter(
    (booking) => booking.status === "checked-in",
  ).length;
  return summary;
}

export function calculateOccupancyRate(bookings) {
  const booked = bookings.filter(
    (booking) =>
      booking.status === "checked-in" || booking.status === "checked-out",
  ).length;
  const occupancyRate = (booked / TOTAL_CABINS) * 100;
  return occupancyRate.toFixed(2);
}

export function pieChartData(bookings) {
  const checkedIn = bookings?.filter(
    (booking) => booking.status === "checked-in",
  ).length;
  const unconfirmed = bookings.filter(
    (booking) => booking.status === "unconfirmed",
  ).length;
  const checkOut = bookings.filter(
    (booking) => booking.status === "checked-out",
  ).length;

  return { checkedIn, unconfirmed, checkOut };
}

export function calculateAreaChartData(bookings, period) {
  let DateRange = [];
  const periodDate = new Date();
  if (period === "7-days") {
    periodDate.setDate(periodDate.getDate() - 7);
    while (periodDate <= new Date()) {
      DateRange.push(
        periodDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      );
      periodDate.setDate(periodDate.getDate() + 1);
    }
  } else if (period === "30-days") {
    periodDate.setDate(periodDate.getDate() - 30);
    while (periodDate <= new Date()) {
      DateRange.push(
        periodDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      );
      periodDate.setDate(periodDate.getDate() + 1);
    }
  } else {
    periodDate.setDate(periodDate.getDate() - 90);
    while (periodDate <= new Date()) {
      DateRange.push(
        periodDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      );
      periodDate.setDate(periodDate.getDate() + 1);
    }
  }

  console.log("date range:", DateRange);

  const report = DateRange.reduce((acc, date) => {
    bookings.forEach((booking) => {
      const bookDate = new Date(booking.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      if (bookDate === date) {
        const Revenue =
          booking.status === "checked-out" || booking.status === "checked-in"
            ? Number(booking.price) +
              (booking.breakfastIncluded ? 30 * Number(booking.guests) : 0)
            : 0;
        const Breakfast = booking.breakfastIncluded
          ? 30 * Number(booking.guests)
          : 0;
        if (!acc[date]) {
          acc[date] = { date, Revenue: 0, Breakfast: 0 };
        }
        acc[date].Revenue += Revenue;
        acc[date].Breakfast += Breakfast;
      } else {
        if (!acc[date]) {
          acc[date] = { date, Revenue: 0, Breakfast: 0 };
        }
      }
    });
    return acc;
  }, {});
  console.log("report", Object.values(report));

  return Object.values(report);
  // const areaChartData = bookings?.reduce((acc, booking, index) => {
  //   const perioddate = new Date(periodDate).toLocaleDateString("en-US", {
  //     month: "short",
  //     day: "numeric",
  //   });
  //   const bookDate = new Date(booking.createdAt).toLocaleDateString("en-US", {
  //     month: "short",
  //     day: "numeric",
  //   });
  //   console.log(date >= perioddate, "comparison", date, perioddate);
  //   if (bookDate >= perioddate) {
  //     const Revenue =
  //       booking.status === "checked-out" || booking.status === "checked-in"
  //         ? Number(booking.price) +
  //           (booking.breakfastIncluded ? 30 * Number(booking.guests) : 0)
  //         : 0;
  //     const Breakfast = booking.breakfastIncluded
  //       ? 30 * Number(booking.guests)
  //       : 0;

  //     if (!acc[bookDate]) {
  //       acc[bookDate] = { bookDate, Revenue: 0, Breakfast: 0 };
  //     }
  //     acc[date].Revenue += Revenue;
  //     acc[date].Breakfast += Breakfast;
  //     return acc;
  //   }
  // }, {});
}
