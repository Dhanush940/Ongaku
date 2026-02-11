import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/auth/userSlice";
import songReducer from "../features/song/songSlice";
import playerReducer from "../features/player/playerSlice";
import playlistReducer from "../features/playlist/playlistSlice";

const Store = configureStore({
  reducer: {
    user: userReducer,
    songs: songReducer,
    storage: playerReducer,
    playlist: playlistReducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store;
