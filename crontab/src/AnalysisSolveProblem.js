const API = require('./API');
const api = new API();
const DB = require('../db');
const { TODAY, YESTERDAY, TOMORROW, TWO_DAYS_AGO, WEEK } = require('../lib/Date');

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

module.exports = AnalysisSolveProblem;
