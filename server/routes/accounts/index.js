const router = require('express').Router();
const ctrl = require('./accounts.ctrl');

router.route('/join').get(ctrl.join);
router.route('/login').get(ctrl.login);

module.exports = router;
