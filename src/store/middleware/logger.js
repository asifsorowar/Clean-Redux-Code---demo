export default (param) => (state) => (next) => (action) => {
  console.log(param.des);
  return next(action);
};
