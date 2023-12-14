import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@src/store';
import { refresh } from '@modules/auth/redux/thunks';

const MODULE_NAME = 'core';

export const appFirstLoad = createAsyncThunk(
  `${MODULE_NAME}/firstLoad`,
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      await dispatch(refresh());
      
      const user = (getState() as RootState).auth.user;

      return true;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);
