const API = require('./API');
const api = new API();
const DB = require('../db');
const { TODAY, YESTERDAY, TOMORROW, WEEK } = require('../lib/Date');

class AnalysisSolveProblem {
  constructor() {}

  async getSolveProblem(bojIds) {
    const todaySolveObj = {};
    for (const user of bojIds) {
      const solveProblem = await api.getSolveProblem(user); // type : JSON
      todaySolveObj[user] = solveProblem;
    }
    return todaySolveObj;
  }

  /**
   * @param {*} todaySolveObj
   * @returns {Object}
   */
  async compareWithYesterday(todaySolveObj) {
    const compareObj = {};
    for (const bojId in todaySolveObj) {
      const yester = await DB.SolveProblem.findOneByDate(bojId, YESTERDAY);
      if (!yester) continue;

      const diffs = this._compareWithYesterday(yester, todaySolveObj[bojId]);
      if (diffs) {
        compareObj[bojId] = diffs;
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
