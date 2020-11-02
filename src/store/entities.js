import { combineReducers } from "@reduxjs/toolkit";
import bugReducer from "./bugs";

export default combineReducers({
  bugs: bugReducer,
});
