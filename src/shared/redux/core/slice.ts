import { createSlice } from '@reduxjs/toolkit';
import { CoreState } from '@shared/redux/core/types';
import { appFirstLoad } from '@shared/redux/core/thunks';

const initialState: CoreState = {
  isLoading: true,
};

export const coreSlice = createSlice({
  reducers: {},
  name: 'core',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(appFirstLoad.fulfilled, (state) => {
        state.isLoading = false;
      });
  },
});
