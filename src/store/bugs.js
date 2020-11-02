import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./apiActionCreator";

//selector
export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (bugs) => bugs.filter((bug) => !bug.resolved)
);

const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    bugRequested: (bugs, action) => {
      bugs.loading = true;
    },

    bugRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },

    bugsReceived: (bugs, action) => {
      bugs.loading = false;
      bugs.list = action.payload.bugs;
      bugs.lastFetch = Date.now();
    },

    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload.bugs);
    },

    bugRemoved: (bugs, action) =>
      bugs.list.filter((bug) => bug.id !== action.payload.bugs.id),

    bugResolved: (bugs, action) => {
      const index = bugs.findIndex((bug) => bug.id === action.payload.id);
      bugs[index].resolved = true;
    },
  },
});

const {
  bugAdded,
  bugRemoved,
  bugResolved,
  bugsReceived,
  bugRequested,
  bugRequestFailed,
} = slice.actions;
export default slice.reducer;

export const loadBugs = () => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: "/bugs",
      onStart: bugRequested.type,
      onSuccess: bugsReceived.type,
      onError: bugRequestFailed.type,
    })
  );
};

export const addBug = (bug) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: "/bugs",
      method: "post",
      data: bug,
      onSuccess: bugAdded.type,
      onError: "apiCallFailed",
    })
  );
};

export const deleteBug = (id) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: `/bugs/${id}`,
      method: "delete",
      onSuccess: bugRemoved.type,
      onError: "apiCallFailed",
    })
  );
};

// other approaches
////////////////////////////////

// Manual ( without redux toolkit) /////

// action types
// const BUG_ADDED = "bugAdded";
// const BUG_REMOVED = "bugRemoved";
// const BUG_RESOLVED = "bugResolved";

// // actions
// export const bugAdded = (description) => ({
//   type: BUG_ADDED,
//   payload: {
//     description,
//   },
// });

// export const bugRemoved = (id) => ({
//   type: BUG_REMOVED,
//   payload: {
//     id,
//   },
// });

// export const bugResolved = (id) => ({
//   type: BUG_RESOLVED,
//   payload: {
//     id,
//   },
// });

//////////////////////////////////

// using toolkit ( createAction and createReducer ) ////

// import { createAction, createReducer } from "@reduxjs/toolkit";

// //action types & actions
// export const bugAdded = createAction("bugAdded");
// export const bugRemoved = createAction("bugRemoved");
// export const bugResolved = createAction("bugResolved");

// // reducer
// let lastId = 0;

// export default createReducer([], {
//   [bugAdded.type]: (bugs, action) => {
//     bugs.push({
//       id: ++lastId,
//       description: action.payload.description,
//       resolved: false,
//     });
//   },

//   [bugRemoved.type]: (bugs, action) => {
//     const newBugs = [...bugs];
//     const index = newBugs.findIndex((bug) => bug.id === action.payload.id);
//     newBugs.slice(index, 1);
//     return newBugs;
//   },

//   [bugResolved.type]: (bugs, action) => {
//     const index = bugs.findIndex((bug) => bug.id === action.payload.id);
//     bugs[index].resolved = true;
//   },
// });

// export default function reducer(state = [], action) {
//   switch (action.type) {
//     case bugAdded.type:
//       return [
//         ...state,
//         {
//           id: ++lastId,
//           description: action.payload.description,
//           resolved: false,
//         },
//       ];
//     case bugRemoved.type:
//       return state.filter((bug) => bug.id !== action.payload.id);

//     case bugResolved.type:
//       return state.map((bug) =>
//         bug.id !== action.payload.id ? bug : { ...bug, resolved: true }
//       );

//     default:
//       return state;
//   }
// }
