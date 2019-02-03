import months from "./months";

export default function getDaysGoneBy(date, month, isLeapYear) {
  let days = 0;

  for (let i = 0; i < month; i++) {
    console.log("we hit month: ", months[i].name);
    days = days + months[i].days(isLeapYear);
  }

  return days + date;
}
