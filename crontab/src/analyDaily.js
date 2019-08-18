const DB = require('../db');
const API = require('./API');
const moment = require('moment');
const TODAY = moment().format('YYYYMMDD');
const bulkdata = require('./buldata');

const api = new API();
const dbConnect = async () => {
  process.env.NODE_ENV === 'development' ? await bulkdata() : await DB.sequelize.sync();
};

const compareWithYesterday = () => {};

const getSolveProblem = async userIds => {
  const todaySolveObj = {};
  for (const user of userIds) {
    const solveProblem = await api.getSolveProblem(user); // type : JSON
    todaySolveObj[user] = solveProblem;
  }
  return todaySolveObj;
};

const saveSolveProblem = async todaySolveObj => {
  for (const key in todaySolveObj) {
    await DB.SolveProblem.createTodaySolve(key, todaySolveObj[key], TODAY);
  }
};

const run = async () => {
  await dbConnect();
  const userIds = await DB.User.getAllUserId();
  const userIdArr = userIds.map(user => user.userId);
  const todaySolveObj = await getSolveProblem(userIdArr);
  await saveSolveProblem(todaySolveObj);
};

try {
  run();
} catch (e) {
  console.log(e);
}
