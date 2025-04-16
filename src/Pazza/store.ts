import { configureStore } from "@reduxjs/toolkit";
import folderReducer from "./reducer";

const store = configureStore({
  reducer: {
    folderReducer,
  },
});
export default store;