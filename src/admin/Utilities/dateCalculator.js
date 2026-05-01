export function calculatePeriod(filter) {
  let period;
  if (filter === "7-days") {
    period = new Date();
    period.setDate(period.getDate() - 7);
  } else if (filter === "30-days") {
    period = new Date();
    period.setDate(period.getDate() - 30);
  } else {
    period = new Date();
    period.setDate(period.getDate() - 90);
  }
  return period.toISOString();
}
