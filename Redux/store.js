import { configureStore } from "@reduxjs/toolkit";
import StateManager from "./StateManager";

export default configureStore({
  reducer: {
    StateManager: StateManager,
  },
});
