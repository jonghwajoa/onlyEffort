const moment = require('moment');
const DAY_SECOND = 3600 * 24 * 1000;

const getCunrrentWeek = () => {
  const standardDate = new Date();
  standardDate.setMonth(0, 1);
  standardDate.setHours(0, 0, 0);

  const today = new Date();
  today.setDate(today.getDate() - 1);
  const weekNumber = Math.ceil(((today - standardDate) / DAY_SECOND + standardDate.getDay() - 1) / 7);
  return weekNumber;
};

const date = new Date();
const TOMORROW = moment(date).format('YYYYMMDD');
date.setDate(date.getDate() - 1);
const TODAY = moment(date).format('YYYYMMDD');
date.setDate(date.getDate() - 1);
const YESTERDAY = moment(date).format('YYYYMMDD');
const WEEK = getCunrrentWeek();

module.exports = {
  WEEK,
  TODAY,
  YESTERDAY,
  TOMORROW
};
