const DB = require('../db');
const API = require('./API');
const { TODAY, YESTERDAY, getCunrrentWeek } = require('../lib/Date');
const bulkdata = require('./buldata');

const api = new API();

const dbConnect = async () => {
  process.env.NODE_ENV === 'development' ? await bulkdata() : await DB.sequelize.sync();
};

/**
 * @param {Object} todaySolveObj
 * Obj = {
 *  solveProblem : {},
 *  size
 * }
 */
const saveSolveProblem = async todaySolveObj => {
  for (const userId in todaySolveObj) {
    await DB.SolveProblem.createTodaySolve(userId, todaySolveObj[userId], TODAY);
  }
};

class AnalysisSolveProblem {
  constructor() {}

  async getSolveProblem(userIds) {
    const todaySolveObj = {};
    for (const user of userIds) {
      const solveProblem = await api.getSolveProblem(user); // type : JSON
      todaySolveObj[user] = solveProblem;
    }
    return todaySolveObj;
  }

  async compareWithYesterday(todaySolveObj) {
    for (const key in todaySolveObj) {
      await DB.SolveProblem.createTodaySolve(key, todaySolveObj[key], TODAY);
    }
  }
}

const run = async () => {
  await dbConnect();
  const userIds = await DB.User.getAllUserId();
  const userIdArr = userIds.map(user => user.userId);
  const analysis = new AnalysisSolveProblem();
  const todaySolveObj = await analysis.getSolveProblem(userIdArr);
  await saveSolveProblem(todaySolveObj);
  compareWithYesterday(todaySolveObj);
};

try {
  run();
} catch (e) {
  console.log(e);
}
