var express = require('express');
var login_failed = require('../../models/login_failed');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  login_failed.loginCheck(res, req.session.userId);
  res.render('manager');
});

module.exports = router;
