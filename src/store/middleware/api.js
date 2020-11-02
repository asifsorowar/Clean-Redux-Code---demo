import axios from "axios";
import * as apiAction from "../apiActionCreator";

axios.defaults.baseURL = "http://localhost:9001/api";

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== apiAction.apiCallBegan.type) return next(action);

  next(action);

  const { url, method, data, onSuccess, onError, onStart } = action.payload;

  if (onStart) dispatch({ type: onStart });

  try {
    const response = await axios.request({
      url,
      method,
      data,
    });

    dispatch({ type: onSuccess, payload: { bugs: response.data } });
  } catch (error) {
    dispatch({ type: onError, payload: error });
  }
};

export default api;
