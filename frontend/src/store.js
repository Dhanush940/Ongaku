import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./features/auth/redux/user.reducer";
import { songReducer } from "./features/music/redux/song.reducer";
import { storageReducer } from "./features/music/redux/songStorage.reducer";

import { playlistReducer } from "./features/playlist/redux/playlist.reducer";
const Store = configureStore({
  reducer: {
    user: userReducer,
    songs: songReducer,
    storage: storageReducer,
    playlist: playlistReducer,
  },
});

export default Store;
