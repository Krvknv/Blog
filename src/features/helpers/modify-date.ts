export const modifyDate = (dateStr: string) => {
  const monthsArr = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const date = new Date(dateStr);

  const year = date.getFullYear();

  const monthNumber = date.getMonth();
  const monthStr = monthsArr[monthNumber];

  const day = date.getDate();

  const newDateStr = `${monthStr} ${day}, ${year}`;

  return newDateStr;
};
