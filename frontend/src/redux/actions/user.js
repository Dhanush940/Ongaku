import axios from "axios";
import { server } from "../../server";

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const res = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });
    // console.log("Data is : ", res);
    dispatch({
      type: "LoadUserSuccess",
      payload: res.data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response,
    });
  }
};
