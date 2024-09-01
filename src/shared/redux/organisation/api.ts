import { createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URI } from '@shared/constants/core';
import { axiosBaseQuery } from '@shared/api/baseQuery';
import { OrganisationRoutes } from '@shared/redux/organisation/types';

export const organisationApi = createApi({
  reducerPath: 'organisationApi',
  baseQuery: axiosBaseQuery({ baseUrl: `${BASE_URI}/api/${OrganisationRoutes.Base}` }),
  tagTypes: ['freeStudents'],
  endpoints: (builder) => ({
    getOrganisationAdmins: builder.query<any, void>({
      query: () => ({
        url: `${OrganisationRoutes.GetAdmins}`,
        method: 'GET',
      }),
    }),
    getOrganisationStudentsNotInGroup: builder.query({
      query: ({ groupId }) => ({
        url: `${OrganisationRoutes.GetStudentsNotInGroup}`,
        method: 'GET',
        params: {
          id: groupId,
        },
      }),
      providesTags: (_result, _error, { groupId }) => [{ type: 'freeStudents', id: groupId }],
    }),
  }),
});

export const {
  useGetOrganisationAdminsQuery,
  useGetOrganisationStudentsNotInGroupQuery,
} = organisationApi;
