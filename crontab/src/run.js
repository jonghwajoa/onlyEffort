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
  for (const bojId in todaySolveObj) {
    await DB.SolveProblem.createTodaySolve(bojId, todaySolveObj[bojId], TODAY);
  }
};

const saveNewSolveProblem = async compareObj => {
  const bulks = [];
  const solveCntObj = {};

  for (const bojId in compareObj) {
    const obj = compareObj[bojId];
    for (const number in obj) {
      const form = createNewSolveProblemForm(bojId, number, obj[number], TODAY);
      solveCntObj[number] = solveCntObj[number] ? solveCntObj[number] + 1 : 1;
      bulks.push(form);
    }
  }

  await DB.DailySolve.bulkCreate(bulks);
  return solveCntObj;
};

const createNewSolveProblemForm = (bojId, number, name, date) => {
  return { bojId, number, name, date, week: WEEK };
};

const getbojIds = async () => {
  const users = await DB.User.findAllByBojId();
  return users.map(user => user.bojId);
};

const run = async () => {
  await dbConnect();
  const bojIds = await getbojIds();
  const analysis = new AnalysisSolveProblem();
  const todaySolveObj = await analysis.getSolveProblem(bojIds);
  // await saveSolveProblem(todaySolveObj);

  const compareObj = await analysis.compareWithYesterday(todaySolveObj);
  const solveCnt = await saveNewSolveProblem(compareObj);

  console.log(solveCnt);
};

try {
  run();
} catch (e) {
  console.log(e);
}
