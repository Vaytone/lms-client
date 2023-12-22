import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '@src/modules/auth/redux/slice';
import { coreSlice } from '@shared/redux/core/slice';
import { applicationSlice } from '@modules/members/redux/applications/slice';

export const store = configureStore({
  reducer: {
    [coreSlice.name]: coreSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [applicationSlice.name]: applicationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
