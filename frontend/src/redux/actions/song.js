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
    // console.log("Data is : ", res);
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
    // console.log(data.playlists);

    // console.log(res);If you try to access variables that are not in this scope or rather defined , immediately catch will be triggered

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
