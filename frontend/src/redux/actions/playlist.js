import axios from "axios";
import { backend_server } from "../../config";
import { toast } from "react-toastify";

export const createPlaylist = (playlistName) => async (dispatch) => {
  try {
    dispatch({
      type: "createPlaylistRequest",
    });
    const res = await axios.post(
      `${backend_server}/playlist/createPlaylist`,
      { playlistName },
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "createPlaylistSuccess",
      payload: res?.data?.playlist,
    });

    dispatch(getPlaylists());
    //calling getPlaylists here coz if i call it in playlist contentpage some times getplaylists is being called before createplaylist request now no need to worry coz it will only be called after createPlaylist is called.
  } catch (error) {
    dispatch({
      type: "createPlaylistFail",
      payload: error?.response,
    });
  }
};

export const getPlaylists = () => async (dispatch) => {
  try {
    dispatch({ type: "getPlaylistsRequest" });

    const { data } = await axios.get(
      `${backend_server}/playlist/getPlaylists`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "getPlaylistsSuccess",
      payload: data.playlistNames,
    });
  } catch (err) {
    dispatch({
      type: "getPlaylistsFail",
      payload: err?.response,
    });
  }
};

export const deletePlaylist = (content) => async (dispatch) => {
  try {
    dispatch({
      type: "deletePlaylistRequest",
    });

    const { data } = await axios.delete(
      `${backend_server}/playlist/deletePlaylist/${content._id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deletePlaylistSuccess",
      payload: data?.deletedPlaylist,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "deletePlaylistFail",
      payload: err?.response?.data?.message,
    });
  }
};

export const updatePlaylistsSongs =
  (playlists) => async (dispatch, getState) => {
    try {
      dispatch({ type: "updatePlaylistsSongsSuccess", payload: playlists });
    } catch (err) {
      console.log(err);
    }
  };

export const addSongsInPlaylist =
  (array, playlist) => async (dispatch, getState) => {
    try {
      dispatch({ type: "addSongsInPlaylistRequest" });
      const songs = getState().songs.songs;
      let arrayIndex = 0;
      let filteredSongs = songs.filter((item, index) => {
        if (index === array[arrayIndex] - 1) {
          arrayIndex += 1;
          return true;
        }
      });

      const res = await axios.post(
        `${backend_server}/playlist/addSongs`,
        { filteredSongs, playlist },
        { withCredentials: true }
      );
      dispatch({
        type: "addSongsInPlaylistSuccess",
        payload: { playlist, data: res.data.data },
      });
      toast.success("Song/s added in playlist");
    } catch (err) {
      console.log(err);
      dispatch({ type: "addSongsInPlaylistFail", payload: err?.response });
    }
  };

export const renamePlaylist = (name, playlist) => async (dispatch) => {
  try {
    const { data } = await axios.patch(
      `${backend_server}/playlist/renamePlaylist`,
      { playlist, name },
      { withCredentials: true }
    );

    if (data.success) {
      dispatch({
        type: "renamePlaylistSuccess",
        payload: {
          currentPlaylist: playlist,
          updatedPlaylist: data.updatedPlaylist,
        },
      });
    } else {
      toast.error(data.error);
    }
  } catch (err) {
    console.log(err);
  }
};

export const removeSongFromPlaylist =
  (playlistId, songToBeRemoved) => async (dispatch) => {
    try {
      const { data } = await axios.patch(
        `${backend_server}/playlist/removeSongFromPlaylist`,
        { playlistId, songToBeRemoved },
        { withCredentials: true }
      );
      dispatch({
        type: "removeSongsFromPlaylistSuccess",
        payload: { updatedPlaylist: data.updatedPlaylist },
      });
    } catch (err) {
      console.log(err);
    }
  };
