import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '@shared/api/api';
import { MEMBER_ROUTES } from '@modules/members/constant/routes';
import { UserApplication } from '@modules/members/types/members.types';
import { RootState } from '@src/store';

const MODULE_NAME = 'applications';

export const getApplications = createAsyncThunk(
  `${MODULE_NAME}/get`,
  async (_, { rejectWithValue, getState }) => {
    try {
      const { applications } = getState() as RootState;
      const response = await axiosPrivate.get<UserApplication[]>(`${MEMBER_ROUTES.getApplications}?page=${applications.page}`);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);

export const getApplicationsBySearch = createAsyncThunk(
  `${MODULE_NAME}/get-by-search`,
  async (query: string, { rejectWithValue, getState }) => {
    try {
      const { applications } = getState() as RootState;
      const response = await axiosPrivate.get<UserApplication[]>(`${MEMBER_ROUTES.getApplications}?page=${applications.page}&query=${query}`);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);

export const deleteApplication = createAsyncThunk(
  `${MODULE_NAME}/deleteApplication`,
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.delete<UserApplication>(`${MEMBER_ROUTES.deleteApplication}/${id}`);
      return response.data.id;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);
