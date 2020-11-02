export default (store) => (next) => (action) => {
  if (action.type === "error") {
    return console.log(action.payload.message);
  }
  if (action.type === "apiCallFailed") {
    return console.log(action.payload);
  } else return next(action);
};
