// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   currentUser: {},
//   isLoggedIn: false,
//   currentWidth: window.innerWidth,
// };

// const appSlice = createSlice({
//   name: 'appSlice',
//   initialState,
//   reducers: {
//     updateCurrentUser: (state, action) => {
//       state.currentUser = action.payload;
//     },
//     updateIsLoggedIn: (state, action) => {
//       state.isLoggedIn = action.payload;
//     },
//     setCurrentWidth: (state, action) => {
//       state.currentWidth = action.payload;
//     },
//   },
// });

// export default appSlice.reducer;
// export const { updateCurrentUser, updateIsLoggedIn, setCurrentWidth } = appSlice.actions;


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {
    username: undefined,
    picture: undefined,
    email: undefined,
    savedCodes: []
  },
  isLoggedIn: false,
  currentWidth: window.innerWidth,
};

const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    updateCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    updateIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setCurrentWidth: (state, action) => {
      state.currentWidth = action.payload;
    },
  },
});

export default appSlice.reducer;
export const { updateCurrentUser, updateIsLoggedIn, setCurrentWidth } = appSlice.actions;
