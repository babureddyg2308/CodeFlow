// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import compilerSlice from './slices/compilerSlice';
// import { api } from './slices/api';
// import appSlice from './slices/appSlice';

// export const store = configureStore({
//   reducer: {
//     [api.reducerPath]: api.reducer,
//     compilerSlice,
//     appSlice,
//   },
//   middleware: getDefaultMiddleware().concat(api.middleware),
// });

// // export var RootState = store.getState;

import { configureStore } from '@reduxjs/toolkit';
import compilerSlice from './slices/compilerSlice';
import { api } from './slices/api';
import appSlice from './slices/appSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    compilerSlice: compilerSlice,
    appSlice: appSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Note: No need for RootState type in JavaScript
