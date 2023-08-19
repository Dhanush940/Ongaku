export const addToStorage = (data) => async (dispatch, getState) => {
  try {
    // console.log("Item is ", data);
    dispatch({
      type: "addToStorage",
      payload: data,
    });

    // console.log("The state is :", getState());
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
    // console.log("Item is ", da);goes to catch block as da is not found
    // console.log("From remove Storage");
    dispatch({
      type: "removeFromStorageSong",
    });

    // console.log("The state from removeFromStorage is :", getState());

    sessionStorage.removeItem("currentSong");
  } catch (error) {
    dispatch({
      type: "removeFromStorageSongFailed",
      payload: error.response,
    });
  }
};
