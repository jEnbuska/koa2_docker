
let i = 1;
export default async (ctx, next) => {
  const random = Math.random()*20;
  if(i++%100 === 0){
    ctx.status = 500;
    ctx.body = "Random error";
  }else{
    await next();
  }
}
