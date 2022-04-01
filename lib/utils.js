import { customAlphabet } from "nanoid";
const nanoid = customAlphabet(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  12
);
const parseDate = (date) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  date = new Date(date);

  return `${months[date.getMonth()]} ${suffix(date.getDate())}`;
};

function suffix(i) {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
}

const sortEventsByDate = (events, recentFirst) => {
  return events.sort((a, b) => {
    if (recentFirst) {
      return new Date(b.date) - new Date(a.date);
    }
    return new Date(a.date) - new Date(b.date);
  });
};

const filterEventsBySport = (events, sport) => {};

const randomId = () => {
  return nanoid();
};

export { parseDate, sortEventsByDate, filterEventsBySport, randomId };
