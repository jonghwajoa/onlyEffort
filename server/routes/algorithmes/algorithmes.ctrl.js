const DB = require('../../db');
const API = require('../../lib/API/API');
const api = new API();

const index = async (req, res, next) => {
  const [problemRank, userRank, dailySolve, users] = await Promise.all([
    DB.WeeklySolve.findCurrentWeekTopTen(34),
    DB.DailySolve.findCurrentWeekTopUser(34),
    DB.DailySolve.findDailySolveCntByWeek(34),
    DB.User.findAllByBojId()
  ]);

  console.log(problemRank);
  res.render('index', { problemRank, userRank, dailySolve, users, week: 34 });
};

const user = async (req, res, next) => {
  const id = req.params.id;
  let solveProblemObj;
  try {
    solveProblemObj = await api.getSolveProblem(id);
  } catch (e) {
    e.status = 500;
    next(e);
  }

  return res.json(solveProblemObj);
};

const vs = async (req, res, next) => {
  const id = req.params.id;
  const compareId = req.params.compareId;

  let compareSolveProblemObj;
  try {
    compareSolveProblemObj = await api.getVsProblem(id, compareId);
  } catch (e) {
    e.status = 500;
    next(e);
  }

  return res.json(compareSolveProblemObj);
};

module.exports = {
  index,
  user,
  vs
};
