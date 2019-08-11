const BOJAPI = require('../../lib/API/BOJAPI');
const bojAPI = new BOJAPI();

const index = (req, res, next) => {
  res.end('algorithm idnex');
};

const user = async (req, res, next) => {
  const id = req.params.id;
  let solveProblemObj;
  try {
    solveProblemObj = await bojAPI.getSolveProblem(id);
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
    compareSolveProblemObj = await bojAPI.getVsProblem(id, compareId);
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
