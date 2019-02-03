import getDaysGoneBy from "./getDaysGoneBy";
import months from "./months";

function getYearInfo() {
  const d = new Date();

  const date = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();

  const isLeapYear = year % 4 === 0;
  const totalDaysInYear = isLeapYear ? 366 : 365;

  const daysGoneBy = getDaysGoneBy(date, month, isLeapYear);

  const percentageOfYearCompleted = (
    (daysGoneBy / totalDaysInYear) *
    100
  ).toFixed(2);
  const percentageOfYearCompletedToString = `${percentageOfYearCompleted}% of the year is gone`;

  //   console.log('date', date, 'month', month, 'year',
  //               year, 'is leap year', isLeapYear,
  //              'total days', totalDaysInYear,
  //              'days gone by', daysGoneBy, 'percentage of year completed',
  //              percentageOfYearCompleted);

  console.log(percentageOfYearCompletedToString);

  return {
    date,
    month: months[month].name,
    year,
    isLeapYear,
    totalDaysInYear,
    daysGoneBy,
    percentageOfYearCompleted,
    percentageOfYearCompletedToString
  };
}

export default getYearInfo;
