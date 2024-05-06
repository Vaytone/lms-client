import { createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URI } from '@shared/constants/core';
import { ApplicationsRoutes } from '@modules/applications/types/routes.types';
import { axiosBaseQuery } from '@shared/api/baseQuery';
import { UserApplication } from '@modules/applications/types/application.types';

export const applicationApi = createApi({
  reducerPath: 'applicationApi',
  baseQuery: axiosBaseQuery({ baseUrl: `${BASE_URI}/api/${ApplicationsRoutes.Base}` }),
  endpoints: (builder) => ({
    getApplications: builder.query<UserApplication[], void>({
      query: () => ({ url: '', method: 'GET' }),
    }),
  }),
});

export const { useGetApplicationsQuery } = applicationApi;
