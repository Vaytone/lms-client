import { createAsyncThunk } from '@reduxjs/toolkit';
import { refresh } from '@modules/auth/redux/thunks';

const MODULE_NAME = 'core';

export const appFirstLoad = createAsyncThunk(
  `${MODULE_NAME}/firstLoad`,
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await dispatch(refresh());
      
      return true;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);
