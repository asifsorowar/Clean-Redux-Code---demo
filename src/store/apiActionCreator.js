import { createAction } from "@reduxjs/toolkit";

export const apiCallBegan = createAction("api/apiCallBegan");
export const apiOnSuccess = createAction("api/apiOnSuccess");
export const apiOnError = createAction("api/apiOnError");
