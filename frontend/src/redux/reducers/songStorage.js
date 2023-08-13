import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  currentSong: sessionStorage.getItem("currentSong")
    ? JSON.parse(sessionStorage.getItem("currentSong"))
    : {},
};

export const storageReducer = createReducer(initialState, {
  addToStorage: (state, action) => {
    state.currentSong = action.payload;
  },
  addToStorageFailed: (state, action) => {
    state.addstorageError = action.payload;
  },
  removeFromStorageSong: (state) => {
    state.currentSong = {};
  },
  removeFromStorageSongFailed: (state, action) => {
    state.removeStorageError = action.payload;
  },
});

// console.log("state.cart is :", JSON.stringify(state.cart));
// console.log("state is :", state);
// console.log({} === true);
// if (state.cart && state.cart?._id !== action.payload._id) {
//   state.cart = action.payload;
//   console.log("in if statement state.cart is ", state.cart);
// } else {
//   console.log("state.cart is :", state.cart);
//   return {
//     ...state,
//     cart: { ...state.cart },
//   };
// }
// console.log("Before processing the state is :", JSON.stringify(state));
// console.log(
//   "Before processing the state.cart is :",
//   JSON.stringify(state.cart)
// );

// console.log("After processing the state is :", JSON.stringify(state));
// console.log(
//   "After processing the state.cart is :",
//   JSON.stringify(state.cart)
// );
