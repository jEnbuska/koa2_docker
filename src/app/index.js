const Koa = require('koa');
const app = new Koa();
app.use(require('koa-bodyparser')());
app.use(require('./logger').default);


const api = require('./api/v1');
app.use(api.routes());
const port = process.env.PORT || 9000;
const server = app.listen(port, () => console.log('server started '+port));

module.exports = {app, server};