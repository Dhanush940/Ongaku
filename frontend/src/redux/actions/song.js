import axios from "axios";
import { server } from "../../server";

export const loadSongs = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSongsRequest",
    });
    const res = await axios.get(`${server}/song/getSongs`, {
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
