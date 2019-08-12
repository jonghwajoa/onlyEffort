const router = require('express').Router();
const ctrl = require('./issueMaker.ctrl');

router.route('/').get(ctrl.index);

module.exports = router;
