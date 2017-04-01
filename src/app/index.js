const Koa = require('koa');
const app = new Koa()
const api = require('./api/v1');
app.use(api.routes())

app.listen(9000, () => console.log('server started 9000'))

module.exports = app;