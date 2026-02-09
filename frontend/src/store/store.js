import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../features/auth/redux/reducers/userReducer";
import { songReducer } from "../features/song/redux/reducers/songReducer";
import { playerReducer } from "../features/player/redux/reducers/playerReducer";
import { playlistReducer } from "../features/playlist/redux/reducers/playlistReducer";

const Store = configureStore({
  reducer: {
    user: userReducer,
    songs: songReducer,
    storage: playerReducer,
    playlist: playlistReducer,
  },
});

export default Store;
