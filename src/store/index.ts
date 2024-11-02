import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '@src/modules/auth/redux/slice';
import { coreSlice } from '@shared/redux/core/slice';
import { applicationApi } from '@modules/applications/redux/api';
import { organisationApi } from '@shared/redux/organisation/api';
import { groupsApi } from '@modules/groups/redux/api';
import { courseBuilderSlice } from '@modules/courses/redux/slice';

export const store = configureStore({
  reducer: {
    [coreSlice.name]: coreSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [courseBuilderSlice.name]: courseBuilderSlice.reducer,
    [applicationApi.reducerPath]: applicationApi.reducer,
    [organisationApi.reducerPath]: organisationApi.reducer,
    [groupsApi.reducerPath]: groupsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      applicationApi.middleware,
      organisationApi.middleware,
      groupsApi.middleware,
    );
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
