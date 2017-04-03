export default async (ctx, next) => {
  const {method, url, body} = ctx.request;
  console.log(JSON.stringify({request: {url, method, body}}, null, 1));
  await next();
  const {status, message} = ctx;
  console.log(JSON.stringify({response: {status,message,body: ctx.body}}, null,
    1));
  console.log('-------------------------------------');
}
