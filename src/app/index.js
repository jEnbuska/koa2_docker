const Koa = require('koa');
const app = new Koa();

app.use(require('koa-cors')());
app.use(require('koa-bodyparser')());
if(process.env.NODE_ENV!=='test'){
  app.use(require('./logger').default);
  app.use(require('./random-error').default);
  app.use(require('koa-delay')(400, 400));
}
const api = require('./api/v1');
app.use(api.routes());
const port = process.env.PORT || 9000;
const server = app.listen(port, () => console.log('server started '+port));

module.exports = {app, server};