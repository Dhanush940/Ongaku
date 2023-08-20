import axios from "axios";
import { backend_server } from "../../server";
import { updatePlaylistsSongs } from "./playlist";

export const loadSongs = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSongsRequest",
    });
    const res = await axios.get(`${backend_server}/song/getSongs`, {
      withCredentials: true,
    });

    dispatch({
      type: "LoadSongsSuccess",
      payload: res?.data?.songs,
    });
  } catch (error) {
    dispatch({
      type: "LoadSongsFail",
      payload: error?.response,
    });
  }
};

export const deleteSongFromDatabase = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "DeleteSongRequest",
    });
    const { data } = await axios.delete(
      `${backend_server}/song/deleteSong/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "DeleteSongSuccess",
      payload: data?.deletedSong,
    });

    dispatch(updatePlaylistsSongs(data.playlists));
  } catch (error) {
    dispatch({
      type: "DeleteSongFail",
      payload: error?.response,
    });
  }
};
