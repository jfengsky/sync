import koa from 'koa'
const app = koa()
const proxyServer = koa()

app.use(function *(next){

  this.body = 'Hello World'
})

app.listen(3000)