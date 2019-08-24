const router = require('express').Router();
const DB = require('../../db');
const Op = DB.Sequelize.Op;

router.get('/:id/range', async (req, res, next) => {
  const id = req.params.id;
  const st = req.query.start;
  const ed = req.query.end;
  const date = {
    [Op.gte]: st,
    [Op.lte]: ed
  };
  const range = await DB.DailySolve.findRangeDate(id, date);
  return res.json(range);
});

module.exports = router;
