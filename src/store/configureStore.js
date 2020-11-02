import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from "./middleware/logger";
import error from "./middleware/error";
import api from "./middleware/api";

export default () =>
  configureStore({
    reducer,
    middleware: [
      ...getDefaultMiddleware(),
      logger({ des: "This is logger" }),
      error,
      api,
    ],
  });
