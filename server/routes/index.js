const createError = require('http-errors');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(301).redirect('/algorithms');
});

router.use('/robots.txt', require('./robots'));
router.use('/algorithms', require('./algorithmes'));
router.use('/api', require('./api'));

router.use(function(req, res, next) {
  next(createError(404));
});

router.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = router;
