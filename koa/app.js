var koa = require('koa');
var router = require('koa-router')();
var serve = require('koa-static');
var app = koa();

// 设置静态目录
app.use(serve(__dirname + '/static/'));

// router
//     .get('/', function *(next){
//         this.body = 'Hello World!'
//     })
//     .post('/users', function *(next){
//         console.log(this.params)
//     })

app.use(function *(){
  this.body = 'Hello World';
});
 
app.listen(3010);