const DB = require('../db');
const AnalysisSolveProblem = require('./AnalysisSolveProblem');

const { TODAY, YESTERDAY, TOMORROW, WEEK } = require('../lib/Date');
const bulkdata = require('./buldata');

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
    await DB.SolveProblem.createTodaySolve(userId, todaySolveObj[userId], TODAY);
  }
};

const getUserIds = async () => {
  const users = await DB.User.getAllUserId();
  return users.map(user => user.userId);
};

const run = async () => {
  await dbConnect();
  const userIds = await getUserIds();
  const analysis = new AnalysisSolveProblem();
  const todaySolveObj = await analysis.getSolveProblem(userIds);
  // await saveSolveProblem(todaySolveObj);

  const compareObj = await analysis.compareWithYesterday(todaySolveObj);
  console.log(compareObj);
};

try {
  run();
} catch (e) {
  console.log(e);
}
