import { createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URI } from '@shared/constants/core';
import { axiosBaseQuery } from '@shared/api/baseQuery';
import { CreateGroupForm } from '@modules/groups/types/group.types';
import { GroupsRoutes } from '@modules/groups/types/routes.types';
import { organisationApi } from '@shared/redux/organisation/api';

export const groupsApi = createApi({
  reducerPath: 'groupsApi',
  baseQuery: axiosBaseQuery({ baseUrl: `${BASE_URI}/api/` }),
  tagTypes: ['groups', 'group', 'freeStudents'],
  endpoints: (builder) => ({
    createGroup: builder.mutation<boolean, {values: CreateGroupForm}>({
      query: ({ values }) => {
        return { url: GroupsRoutes.Create, method: 'POST', data: values };
      },
      invalidatesTags: () => ['groups'],
    }),
    getGroups: builder.query({
      query: ({ query, page }) => ({
        url: `${GroupsRoutes.Base}`,
        method: 'GET',
        params: {
          query: query.trim(),
          page,
        },
      }),
      keepUnusedDataFor: 320,
      providesTags: ['groups'],
    }),
    getGroup: builder.query({
      query: ({ groupId }) => ({
        url: `${GroupsRoutes.Base}/${groupId}`,
        method: 'GET',
      }),
      // keepUnusedDataFor: 640,
      providesTags: (_result, _error, { groupId }) => [{ type: 'group', id: groupId }],
    }),
    addStudents: builder.mutation({
      query: ({ ids, groupId }) => ({
        url: `${GroupsRoutes.AddStudents}`,
        method: 'POST',
        params: { id: groupId },
        data: { ids },
      }),
      async onQueryStarted({ groupId }, { dispatch, queryFulfilled }) {
        try {
          const { data: newStudents } = await queryFulfilled;
          
          // Update the cache for getGroup
          dispatch(
            groupsApi.util.updateQueryData('getGroup', { groupId: groupId.toString() }, (draft) => {
              return {
                ...draft,
                users: [...draft.users, ...newStudents],
              };
            }),
          );
          
          // Invalidate other tags if needed
          await dispatch(organisationApi.util.invalidateTags([{ type: 'freeStudents', id: groupId }]));
          await dispatch(organisationApi.endpoints.getOrganisationStudentsNotInGroup.initiate({ groupId }));
        } catch (error) {
          console.error('Error updating query data:', error);
        }
      },
    }),
  }),
});

export const { useCreateGroupMutation, useGetGroupsQuery, useGetGroupQuery, useAddStudentsMutation } = groupsApi;
