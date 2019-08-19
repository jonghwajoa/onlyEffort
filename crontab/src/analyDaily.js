const DB = require('../db');
const API = require('./API');
const { TODAY, YESTERDAY, TOMORROW, WEEK } = require('../lib/Date');
const bulkdata = require('./buldata');

const api = new API();

const dbConnect = async () => {
  // process.env.NODE_ENV === 'development' ? await bulkdata() : await DB.sequelize.sync();
  await DB.sequelize.sync();
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
    await DB.SolveProblem.createTodaySolve(userId, todaySolveObj[userId], TOMORROW);
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

  /**
   * @param {*} todaySolveObj
   * @returns {Object} key : userId, value : compareArr
   */
  async compareWithYesterday(todaySolveObj) {
    const compareObj = {};
    for (const userId in todaySolveObj) {
      const yester = await DB.SolveProblem.findOneByDate(userId, YESTERDAY);
      if (!yester) continue;

      const diffs = this._compareWithYesterday(yester, todaySolveObj[userId]);
      if (diffs) {
        compareObj[userId] = diffs;
      }
    }
    return compareObj;
  }

  _compareWithYesterday(yesterdayObj, todayObj) {
    if (yesterdayObj.size === todayObj.size) {
      return false;
    }

    const todaySolves = {};
    const { solveProblem } = todayObj;
    for (const num in solveProblem) {
      if (!yesterdayObj.solveProblem[num]) {
        todaySolves[num] = solveProblem[num];
      }
    }
    return todaySolves;
  }
}

const run = async () => {
  await dbConnect();
  const userIds = await DB.User.getAllUserId();
  const userIdArr = userIds.map(user => user.userId);
  const analysis = new AnalysisSolveProblem();
  const todaySolveObj = await analysis.getSolveProblem(userIdArr);
  // await saveSolveProblem(todaySolveObj);

  const compareObj = await analysis.compareWithYesterday(todaySolveObj);
  console.log(compareObj);
};

try {
  run();
} catch (e) {
  console.log(e);
}
