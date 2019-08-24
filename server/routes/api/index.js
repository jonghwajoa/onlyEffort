const router = require('express').Router();

router.route('/range').get(req, res, next => {
  const start = req.params.start;
  const end = req.params.end;
});

module.exports = router;
