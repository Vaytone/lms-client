import { createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URI } from '@shared/constants/core';
import { axiosBaseQuery } from '@shared/api/baseQuery';
import { CreateGroupForm } from '@modules/groups/types/group.types';
import { GroupsRoutes } from '@modules/groups/types/routes.types';

export const groupsApi = createApi({
  reducerPath: 'groupsApi',
  baseQuery: axiosBaseQuery({ baseUrl: `${BASE_URI}/api/` }),
  endpoints: (builder) => ({
    createGroup: builder.mutation<boolean, {values: CreateGroupForm}>({
      query: ({ values }) => {
        return { url: GroupsRoutes.Create, method: 'POST', data: values };
      },
    }),
  }),
});

export const { useCreateGroupMutation } = groupsApi;
