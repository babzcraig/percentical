const months = [
  { name: "Jan", days: lpYear => 31 },
  { name: "Feb", days: lpYear => (lpYear ? 29 : 28) },
  { name: "Mar", days: lpYear => 31 },
  { name: "Apr", days: lpYear => 30 },
  { name: "May", days: lpYear => 31 },
  { name: "Jun", days: lpYear => 30 },
  { name: "Jul", days: lpYear => 31 },
  { name: "Aug", days: lpYear => 31 },
  { name: "Sep", days: lpYear => 30 },
  { name: "Oct", days: lpYear => 31 },
  { name: "Nov", days: lpYear => 30 },
  { name: "Dec", days: lpYear => 31 }
];

export default months;
