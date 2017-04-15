export default async (ctx, next) => {
  setTimeout(() => next(), 1900);
}