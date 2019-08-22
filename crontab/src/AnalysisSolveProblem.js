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
  async compareRecentTwoData(bojIds) {
    const compareObj = {};
    for (const bojId of bojIds) {
      const recent2data = await DB.SolveProblem.findRecentTwoDataByBojId(bojId);
      if (recent2data.length !== 2) {
        continue;
      }

      const mostRecent = recent2data[0];
      const compare = recent2data[1];
      if (mostRecent.size === compare.size) {
        continue;
      }

      const diffs = this._compareRecentTwoData(compare.solveProblem, mostRecent.solveProblem);
      compareObj[bojId] = diffs;
    }
    return compareObj;
  }

  _compareRecentTwoData(compareSolve, recentSolve) {
    const compareResultObj = {};
    for (const num in recentSolve) {
      if (!compareSolve[num]) {
        compareResultObj[num] = recentSolve[num];
      }
    }
    return compareResultObj;
  }
}

module.exports = AnalysisSolveProblem;
