import { createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URI } from '@shared/constants/core';
import { ApplicationsRoutes } from '@modules/applications/types/routes.types';
import { axiosBaseQuery } from '@shared/api/baseQuery';
import { UserApplication } from '@modules/applications/types/application.types';
import { UserStatus } from '@type/user.types';

type GetApplicationsQueryParams = {
  query: string;
  role: string;
  sortBy: string;
  page: number | string;
};

export const applicationApi = createApi({
  reducerPath: 'applicationApi',
  baseQuery: axiosBaseQuery({ baseUrl: `${BASE_URI}/api/` }),
  endpoints: (builder) => ({
    getApplications: builder.query({
      query: ({ query, sortBy, role, page }) => ({
        url: `${ApplicationsRoutes.Base}`,
        method: 'GET',
        params: {
          query: query.trim(),
          sortBy,
          role,
          page,
        },
      }),
      keepUnusedDataFor: 320,
    }),
    acceptApplication: builder.mutation<boolean, {id: number, query: GetApplicationsQueryParams}>({
      query: ({ id }) => ({ url: `${ApplicationsRoutes.Accept}?id=${id}`, method: 'PUT' }),
      onQueryStarted: async ({ query, id }, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        
        dispatch(
          applicationApi.util.updateQueryData('getApplications', query, (draftApplications) => {
            return {
              ...draftApplications,
              data: draftApplications.data.map((item: UserApplication) => {
                if (item.id === id) {
                  return {
                    ...item,
                    user_statuses: {
                      ...item.user_statuses,
                      status: UserStatus.Active,
                    },
                  };
                }
                return item;
              }),
            };
          }),
        );
      },
    }),
    rejectApplication: builder.mutation<boolean, {id: number, query: GetApplicationsQueryParams}>({
      query: ({ id }) => ({ url: `${ApplicationsRoutes.Reject}?id=${id}`, method: 'PUT' }),
      onQueryStarted: async ({ query, id }, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(
          applicationApi.util.updateQueryData('getApplications', query, (draftApplications) => {
            
            console.log(draftApplications);
            
            return {
              ...draftApplications,
              data: draftApplications.data.map((item: UserApplication) => {
                if (item.id === id) {
                  return {
                    ...item,
                    user_statuses: {
                      ...item.user_statuses,
                      status: UserStatus.Rejected,
                    },
                  };
                }
                return item;
              }),
            };
          }),
        );
      },
    }),
    revertApplication: builder.mutation<boolean, {id: number, query: GetApplicationsQueryParams}>({
      query: ({ id }) => ({ url: `${ApplicationsRoutes.Revert}?id=${id}`, method: 'PUT' }),
      onQueryStarted: async ({ query, id }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          applicationApi.util.updateQueryData('getApplications', query, (draftApplications) => {
            return {
              ...draftApplications,
              data: draftApplications.data.map((item: UserApplication) => {
                if (item.id === id) {
                  return {
                    ...item,
                    user_statuses: {
                      ...item.user_statuses,
                      status: UserStatus.Pending,
                    },
                  };
                }
                return item;
              }),
            };
          }),
        );
        
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useLazyGetApplicationsQuery,
  useAcceptApplicationMutation,
  useRejectApplicationMutation,
  useRevertApplicationMutation,
  useGetApplicationsQuery,
} = applicationApi;
