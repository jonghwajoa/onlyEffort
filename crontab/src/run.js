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

const saveNewSolveProblem = async compareObj => {
  const bulks = [];

  for (const bojId in compareObj) {
    const obj = compareObj[bojId];
    for (const number in obj) {
      const form = createNewSolveProblemForm(bojId, number, obj[number], TODAY);
      bulks.push(form);
    }
  }

  await DB.sequelize.transaction(tran => {
    return DB.DailySolve.bulkCreate(bulks, { transaction: tran });
  });
};

const calculateDiffCnt = compareObj => {
  const solveProblemCntObj = {};
  for (const bojId in compareObj) {
    const obj = compareObj[bojId];
    for (const number in obj) {
      solveProblemCntObj[number] = {
        cnt: solveProblemCntObj[number] ? solveProblemCntObj[number].cnt + 1 : 1,
        name: obj[number]
      };
    }
  }

  return solveProblemCntObj;
};

const createNewSolveProblemForm = (bojId, number, name, date) => {
  return { bojId, number, name, date, week: WEEK };
};

const savePopularProblemOfWeek = async solveCntObj => {
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
  const compareObj = await analysis.compareRecentTwoData(bojIds);
  await saveNewSolveProblem(compareObj);
  const solveProblemCntObj = calculateDiffCnt(compareObj);
  await savePopularProblemOfWeek(solveProblemCntObj);
};

try {
  run();
} catch (e) {
  console.log(e);
  console.log(e.detail);
}
