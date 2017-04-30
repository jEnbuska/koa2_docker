

export default async (ctx, next) => {
  const random = Math.random()*20;
  if(random>18){
    ctx.status = 500;
    ctx.body = "Random error";
  }else{
    await next();
  }
}
