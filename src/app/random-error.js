
let i = 1;
export default async (ctx, next) => {
  if(i++%100 === 0){
    ctx.status = 500;
    ctx.body = "Random error";
  }else{
    await next();
  }
}
