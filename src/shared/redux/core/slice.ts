import { createSlice } from '@reduxjs/toolkit';
import { CoreState } from '@shared/redux/core/types';
import { appFirstLoad } from '@shared/redux/core/thunks';
import { PageEnum } from '@type/page.types';

const initialState: CoreState = {
  isLoading: true,
  currentPage: PageEnum.Dashboard,
};

export const coreSlice = createSlice({
  name: 'core',
  initialState,
  reducers: {
    setCurrentPage: (state, { payload }) => {
      state.isLoading = false;
      state.currentPage = payload;
    }, 
  },
  extraReducers: (builder) => {
    builder
      .addCase(appFirstLoad.fulfilled, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setCurrentPage } = coreSlice.actions;
