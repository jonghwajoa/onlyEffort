const DB = require('../db');
const API = require('./API');
const moment = require('moment');
const TODAY = moment().format('YYYYMMDD');
const api = new API();
const bulkdata = require('./buldata');

const dbConnect = async () => {
  process.env.NODE_ENV === 'development' ? await bulkdata() : await DB.sequelize.sync();
};

const getUsers = () => DB.User.findAll({ attributes: ['userId'] });

const compareWithYesterday = () => {};

const create = (userId, solveStr) => {
  return DB.SolveProblem.create({
    userId,
    solveProblem: solveStr,
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
  const userIds = await getUsers();
  for (const user of userIds) {
    console.log(user.dataValues);
  }
  // const SolveProblems = await getSolveProblem(userIds);
  const result = await DB.SolveProblem.findOne({
    where: {
      userId: 'jonghwa0710',
      date: TODAY
    }
  });
  console.log(result);
  // const obj = result.dataValues.solve_problem;
};

run();
