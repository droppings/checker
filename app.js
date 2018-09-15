const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const apiRouter = require('./router');

const app = new Koa();

app.use(bodyParser());
app.use(apiRouter.routes());

app.listen(3000);

app.on('error', err => {
  log.error('server error', err)
});