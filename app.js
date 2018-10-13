const Koa = require('koa');

const bodyParser = require('koa-bodyparser');
const apiRouter = require('./router');
const views = require('koa-views'); //模板引擎
const path = require('path');

const app = new Koa();

// 加载模板引擎
app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
}));

app.use(bodyParser());
app.use(apiRouter.routes());


app.use( async ( ctx ) => {
  let title = 'hello koa2'
  await ctx.render('index', {
    title,
  })
})

app.listen(3000);

app.on('error', err => {
  console.log('server error', err)
});