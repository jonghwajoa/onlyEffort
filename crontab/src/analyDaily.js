const DB = require('../db');
const API = require('./API');
const moment = require('moment');
const TODAY = moment().format('YYYYMMDD');
const api = new API();

const dbConnect = () => {
  return DB.sequelize.sync();
};

const getUsers = () => {};
const compareWithYesterday = () => {};

const create = (userId, solveStr) => {
  return DB.SolveProblem.create({
    user_id: userId,
    solve_problem: solveStr,
    date: TODAY
  });
};

const getSolveProblem = async userIds => {
  // return Promise.all(userIds.map(e => api.getSolveProblem(e)));
  for (const user of userIds) {
    const solveProblem = await api.getSolveProblem(user);
    const createResult = await create(user, solveProblem);
    console.log(createResult);
  }
};

const run = async () => {
  await dbConnect();
  // const userIds = await getUsers();
  // const SolveProblems = await getSolveProblem(userIds);
  const result = await DB.SolveProblem.findOne({
    where: {
      user_id: 'jonghwa0710',
      date: TODAY
    }
  });
  const obj = result.dataValues.solve_problem;
};

run();
