import { createAsyncThunk } from '@reduxjs/toolkit';
import { refresh } from '@modules/auth/redux/thunks';
import { setTheme } from '@shared/redux/core/slice';
import { THEME_LOCAL_STORAGE_KEY } from '@shared/constants/core';

const MODULE_NAME = 'core';

export const appFirstLoad = createAsyncThunk(
  `${MODULE_NAME}/firstLoad`,
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await dispatch(refresh());
      const theme = localStorage.getItem(THEME_LOCAL_STORAGE_KEY);
      dispatch(setTheme(theme || 'light'));
      return true;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);
