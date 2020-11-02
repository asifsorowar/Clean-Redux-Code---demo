import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "auth",
  initialState: null,
  reducers: {
    userAdded: (auth, action) => action.payload.user,
    userRemoved: (auth, action) => null,
  },
});

const { userAdded, userRemoved } = slice.actions;
export default slice.reducer;

export const authUser = (user) => (dispatch, getState) => {
  dispatch(userAdded({ user }));
};

export const logout = () => (dispatch, getState) => {
  dispatch(userRemoved());
};
