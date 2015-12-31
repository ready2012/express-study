var express = require('express');
var app = express();

// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
app.use(function (req, res, next) {
  console.log('Timeall:', Date.now());
  next();
});

app.get('/', function (req, res) {
  res.send('Hello World!');
  //res.redirect('a.html')
});
/**
 * 指定目录后，url上面不再需要输入目录了
 */
app.use(express.static('static'));
/**
 * 指定静态目录到某个url（static）路由上
 */
app.use('/static', express.static('static2'));

/**
 * all  
 * 来自 “/secret” 的请求，不管使用 GET、POST、PUT、DELETE 或其他任何 http 模块支持的 HTTP 请求，句柄都会得到执行。
 */
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});
/**
 * 创建一个路径 执行不同的method
 */
app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
});
/**
 * 路由1
 * @type {[type]}
 */
var birds = require('./router1');
app.use('/router1', birds);

/**
 * 路由2
 * @type {[type]}
 */
var birds = require('./router2');
app.use('/router2', birds);


// Handle 404
app.use(function(req, res) {
 	res.send('404: Page not Found', 404);
});
  
// Handle 500
app.use(function(error, req, res, next) {
 	res.send('500: Internal Server Error', 500);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', 'test.node.com', port);
});



