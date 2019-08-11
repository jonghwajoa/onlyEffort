const router = require('express').Router();
const ctrl = require('./algorithmes.ctrl');

router.route('/').get(ctrl.index);

module.exports = router;
