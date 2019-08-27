const { TODAY } = require('../lib/Date');
const DB = require('../db');
const AnalysisSolveProblem = require('./AnalysisSolveProblem');

const saveSolveProblem = async todaySolveObj => {
  const tran = await DB.sequelize.transaction();
  try {
    for (const bojId in todaySolveObj) {
      await DB.SolveProblem.createTodaySolve(bojId, todaySolveObj[bojId], TODAY, tran);
    }
    await tran.commit();
  } catch (e) {
    await tran.rollback();
    e.detail = 'saveSolveProblem Error';
    throw e;
  }
};

const makeUserForms = userIds => {
  const createForms = [];
  for (const userId of userIds) {
    createForms.push(makeUserCreateForm(userId));
  }
  return createForms;
};

const makeUserCreateForm = userId => {
  return { userId, bojId: userId };
};

const run = async () => {
  const userIds = [];
  const userBulkDatas = makeUserForms(userIds);
  await DB.User.bulkCreate(userBulkDatas);
  const analysis = new AnalysisSolveProblem();
  const todaySolveObj = await analysis.getSolveProblem(userIds);
  await saveSolveProblem(todaySolveObj);
};

try {
  run();
} catch (e) {
  console.log(e);
}
