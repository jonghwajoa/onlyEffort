const moment = require('moment');
const DAY_SECOND = 3600 * 24 * 1000;

const getLastWeek = () => {
  const standardDate = new Date();
  standardDate.setMonth(0, 1);
  standardDate.setHours(0, 0, 0);

  const today = new Date();
  today.setDate(today.getDate() - 7);
  const weekNumber = Math.ceil(((today - standardDate) / DAY_SECOND + standardDate.getDay() - 1) / 7);
  return weekNumber;
};

const date = new Date();
const TODAY = moment(date).format('YYYYMMDD');
date.setDate(date.getDate() - 1);
const YESTERDAY = moment(date).format('YYYYMMDD');
const LAST_WEEK = getLastWeek();

module.exports = {
  LAST_WEEK,
  TODAY,
  YESTERDAY
};
