import { createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URI } from '@shared/constants/core';
import { axiosBaseQuery } from '@shared/api/baseQuery';
import { OrganisationRoutes } from '@shared/redux/organisation/types';

export const organisationApi = createApi({
  reducerPath: 'organisationApi',
  baseQuery: axiosBaseQuery({ baseUrl: `${BASE_URI}/api/${OrganisationRoutes.Base}` }),
  endpoints: (builder) => ({
    getOrganisationAdmins: builder.query<any, void>({
      query: () => ({
        url: `${OrganisationRoutes.GetAdmins}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetOrganisationAdminsQuery,
} = organisationApi;
