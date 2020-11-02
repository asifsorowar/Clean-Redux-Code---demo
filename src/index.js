import configureAppStore from "./store/configureStore";
import { loadBugs, addBug, deleteBug } from "./store/bugs";
import { authUser, logout } from "./store/auth";

const store = configureAppStore();

store.subscribe(() => {
  console.log("Store changed", store.getState());
});

store.dispatch(authUser({ name: "Asif" }));
store.dispatch(loadBugs());
store.dispatch(addBug({ description: "Asif-bug" }));
store.dispatch(deleteBug(1));
