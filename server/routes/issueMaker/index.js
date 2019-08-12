const router = require('express').Router();
const ctrl = require('./algorithmes.ctrl');

router.route('/').get(ctrl.index);
router.route('/user/:id').get(ctrl.user);
router.route('/vs/:id/:compareId').get(ctrl.vs);

module.exports = router;
