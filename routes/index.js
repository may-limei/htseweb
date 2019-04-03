var express = require('express');
var router = express.Router();

/* 首页. */
router.get('/', function(req, res, next) {
  res.render('index.html', { title: '首页' });
});

/* 氢能源页面. */
router.get('/hydrogen-energy-resource', function(req, res, next) {
  res.render('h2energy.html', { title: '氢能源' });
});

/* 加氢站页面. */
router.get('/hydrogen-station', function(req, res, next) {
  res.render('h2station.html', { title: '加氢站' });
});

/* 团队页面. */
router.get('/team', function(req, res, next) {
  res.render('team.html', { title: '制氢团队' });
});

/* 联系页面. */
router.get('/contact', function(req, res, next) {
  res.render('contact.html', { title: '联系我们' });
});

module.exports = router;
