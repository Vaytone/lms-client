import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '@src/modules/auth/redux/slice';

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
