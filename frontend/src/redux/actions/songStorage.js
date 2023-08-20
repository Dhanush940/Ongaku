export const addToStorage = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "addToStorage",
      payload: data,
    });

    sessionStorage.setItem(
      "currentSong",
      JSON.stringify(getState().storage.currentSong)
    );
  } catch (error) {
    dispatch({
      type: "addToStorageFailed",
      payload: error.response,
    });
  }
};

export const removeFromStorage = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "removeFromStorageSong",
    });

    sessionStorage.removeItem("currentSong");
  } catch (error) {
    dispatch({
      type: "removeFromStorageSongFailed",
      payload: error.response,
    });
  }
};
