export function statusQuery(status) {
  switch (status) {
    case "checked-in":
      return "checked-in";
    case "checked-out":
      return "checked-out";
    case "unconfirmed":
      return "unconfirmed";
    default:
      return "checked-in,checked-out,unconfirmed";
  }
}
