import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { songReducer } from "./reducers/song";
import { storageReducer } from "./reducers/songStorage";

const Store = configureStore({
  reducer: {
    user: userReducer,
    songs: songReducer,
    storage: storageReducer,
  },
});

export default Store;
