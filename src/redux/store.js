import { configureStore } from "@reduxjs/toolkit";
import folderReducer from "./slices/folderSlice";

const store = configureStore({
  reducer: {
    folders: folderReducer,
  },
});

export default store;
