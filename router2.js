var express = require('express');
var router = express.Router();

// 该路由使用的中间件，只监听本路由下的
router.use(function timeLog(req, res, next) {
  console.log('Time2: ', Date.now());
  next();
});

router.get('/', function(req, res) {
  res.send('router2 Birds home page');
});
// 定义 about 页面的路由
router.get('/about', function(req, res) {
  res.send('router2  About birds');
});

module.exports = router;
