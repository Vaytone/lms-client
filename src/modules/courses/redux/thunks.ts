import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '@shared/api/api';
import { COURSE_BUILDER_ROUTES } from '@modules/courses/constants/routes';

const MODULE_NAME = 'courseBuilder';

export const createCourse = createAsyncThunk(
  `${MODULE_NAME}/create`,
  async (values: FormData, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post(COURSE_BUILDER_ROUTES.create, values);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);
