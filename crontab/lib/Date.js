const moment = require('moment');
const DAY_SECOND = 3600 * 24 * 1000;

const yesterdayDate = new Date();
const tomorrowDate = new Date();
yesterdayDate.setDate(yesterdayDate.getDate() - 1);
tomorrowDate.setDate(tomorrowDate.getDate() + 1);

const getCunrrentWeek = () => {
  const standardDate = new Date();
  standardDate.setMonth(0, 1);
  standardDate.setHours(0, 0, 0);

  const today = new Date();
  today.setMonth(7, 20);
  today.setHours(0, 0, 0);

  const weekNumber = Math.ceil(((today - standardDate) / DAY_SECOND + standardDate.getDay() - 1) / 7);
  return weekNumber;
};

const TODAY = moment().format('YYYYMMDD');
const YESTERDAY = moment(yesterdayDate).format('YYYYMMDD');
const TOMORROW = moment(tomorrowDate).format('YYYYMMDD');
const WEEK = getCunrrentWeek();

module.exports = {
  WEEK,
  TODAY,
  YESTERDAY,
  TOMORROW
};
