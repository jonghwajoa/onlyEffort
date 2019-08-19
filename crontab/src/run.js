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
      solveCntObj[number] = { cnt: solveCntObj[number] ? solveCntObj[number] + 1 : 1, name: obj[number] };
      bulks.push(form);
    }
  }

  await DB.DailySolve.bulkCreate(bulks);
  return solveCntObj;
};

const createNewSolveProblemForm = (bojId, number, name, date) => {
  return { bojId, number, name, date, week: WEEK };
};

const popularProblemOfWeek = async solveCntObj => {
  for (const num in solveCntObj) {
    const { cnt, name } = solveCntObj[num];
    const instance = await DB.WeeklySolve.findOneByNum(WEEK, num);
    if (instance) {
      const updateCnt = instance.dataValues.cnt + cnt;
      await instance.update({ cnt: updateCnt });
    } else {
      await DB.WeeklySolve.createSolveProblem(WEEK, num, name, cnt);
    }
  }
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
  await saveSolveProblem(todaySolveObj);
  const compareObj = await analysis.compareWithYesterday(todaySolveObj);
  const solveCntObj = await saveNewSolveProblem(compareObj);
  await popularProblemOfWeek(solveCntObj);
};

try {
  run();
} catch (e) {
  console.log(e);
}
