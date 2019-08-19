const moment = require('moment');
const TODAY = moment().format('YYYYMMDD');
const DAY_SECOND = 3600 * 24 * 1000;

const yesterdayDate = new Date();
yesterdayDate.setDate(yesterdayDate.getDate() - 1);
const YESTERDAY = moment(yesterdayDate).format('YYYYMMDD');

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

module.exports = {
  getCunrrentWeek,
  TODAY,
  YESTERDAY
};
