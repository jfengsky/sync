var koa = require('koa');
var router = require('koa-router')();
var serve = require('koa-static');
var app = koa();



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