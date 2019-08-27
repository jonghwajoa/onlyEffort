const moment = require('moment');
const DAY_SECOND = 3600 * 24 * 1000;
const YYMMDD = 'YYYYMMDD';

const getLastWeek = () => {
  const standardDate = new Date();
  standardDate.setMonth(0, 1);
  standardDate.setHours(0, 0, 0);

  const today = new Date();
  today.setDate(today.getDate() - 7);
  const weekNumber = Math.ceil(((today - standardDate) / DAY_SECOND + standardDate.getDay() - 1) / 7);
  return weekNumber;
};

const getToday = () => {
  const date = new Date();
  return moment().format(YYMMDD);
};

const getYesterday = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return moment(date).format(YYMMDD);
};

const getStartDateOfWeek = () => {
  const date = new Date();
  const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
  return Number(moment(date.setDate(diff)).format(YYMMDD));
};

const getDateOfWeek = (year, weekNumber) => {
  console.log(`year ${year} , weekNumber ${weekNumber}`);
  const date = (weekNumber - 1) * 7;
  return Number(moment(new Date(year, 0, date)).format(YYMMDD));
};
module.exports = {
  getLastWeek,
  getToday,
  getYesterday,
  getStartDateOfWeek,
  getDateOfWeek
};
