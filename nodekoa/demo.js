var koa = require('koa');
var route = require('koa-route');
var app = koa();
 
app.use(route.get('/api/items', function *(){
  this.body = 'Get'
}));

app.use(route.get('/api/items/:id', function *(id){
  this.body = 'Get id:' + id
}));

app.use(route.post('/api/items', function *(){
  this.body = 'post'
}));

app.use(route.put('/api/items/:id', function *(){
  this.body = 'put id:' + id
}));

app.use(function *(){
  this.body = 'Hello World';
});
 
app.listen(3010);