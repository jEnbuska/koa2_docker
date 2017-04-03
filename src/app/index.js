const Koa = require('koa');
const app = new Koa();
app.use(require('koa-bodyparser')());
const api = require('./api/v1');
app.use(api.routes());

const server = app.listen(9000, () => console.log('server started 9000'));

module.exports = {app, server};