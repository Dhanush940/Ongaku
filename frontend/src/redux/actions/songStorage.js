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

export const removeFromStorage = (data) => async (dispatch, getState) => {
  try {
    // console.log("Item is ", data);
    dispatch({
      type: "removeFromStorage",
    });

    // console.log("The state is :", getState());

    sessionStorage.removeItem("currentSong");
  } catch (error) {
    dispatch({
      type: "addToStorageFailed",
      payload: error.response,
    });
  }
};
