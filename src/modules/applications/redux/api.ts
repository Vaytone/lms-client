import { createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URI } from '@shared/constants/core';
import { ApplicationsRoutes } from '@modules/applications/types/routes.types';
import { axiosBaseQuery } from '@shared/api/baseQuery';
import { UserApplication } from '@modules/applications/types/application.types';

type GetApplicationsQueryParams = {
  query: string;
  role: string;
  sortBy: string;
};

export const applicationApi = createApi({
  reducerPath: 'applicationApi',
  baseQuery: axiosBaseQuery({ baseUrl: `${BASE_URI}/api/` }),
  endpoints: (builder) => ({
    getApplications: builder.query<UserApplication[], GetApplicationsQueryParams>({
      query: ({query, sortBy, role}) => ({ url: `${ApplicationsRoutes.Base}?query=${query}&sortBy=${sortBy}&role=${role}`, method: 'GET' }),
    }),
  }),
});

export const { useGetApplicationsQuery } = applicationApi;
