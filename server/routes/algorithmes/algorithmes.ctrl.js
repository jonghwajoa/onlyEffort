const DB = require('../../db');
const API = require('../../lib/API/API');
const api = new API();

const index = async (req, res, next) => {
  const datas = await DB.DailySolve.findAll();
  const arr = [];
  for (const data of datas) {
    arr.push(data.dataValues);
  }
  res.json(arr);
  // res.render('algo/index');
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
