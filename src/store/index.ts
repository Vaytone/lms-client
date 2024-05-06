import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '@src/modules/auth/redux/slice';
import { coreSlice } from '@shared/redux/core/slice';
import { applicationApi } from '@modules/applications/redux/api';

export const store = configureStore({
  reducer: {
    [coreSlice.name]: coreSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [applicationApi.reducerPath]: applicationApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(applicationApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
