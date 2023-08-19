import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { songReducer } from "./reducers/song";
import { storageReducer } from "./reducers/songStorage";

import { playlistReducer } from "./reducers/playlist";
const Store = configureStore({
  reducer: {
    user: userReducer,
    songs: songReducer,
    storage: storageReducer,
    playlist: playlistReducer,
  },
});

export default Store;
