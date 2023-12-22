import { createSlice } from '@reduxjs/toolkit';
import { ApplicationsState } from '@modules/members/types/members.types';
import { deleteApplication, getApplications, getApplicationsBySearch } from '@modules/members/redux/applications/thunks';

const initialState: ApplicationsState = {
  page: 1,
  data: [],
  selected: [],
  isLoading: true,
};

export const applicationSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    resetApplications: (state) => {
      Object.assign(state, initialState);
    },
    setSelectedApplications: (state, { payload }) => {
      if (state.selected.includes(payload)) {
        state.selected = state.selected.filter((item) => item !== payload);
      } else {
        state.selected.push(payload);
      }
    },
    selectAllApplications: (state) => {
      const set = new Set(state.selected);
      const isAllSelected = state.data.every((el) => set.has(el.id));
      
      if (!isAllSelected) {
        const idArr: number[] = [];
        state.data.forEach((item) => {
          if (!state.selected.includes(item.id)) {
            idArr.push(item.id);
          }
        });
        state.selected = state.selected.concat(idArr);
      } else {
        state.selected = state.selected.filter((item) => !state.data.find((obj) => obj.id === item));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getApplications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getApplications.fulfilled, (state, { payload }) => {
        state.data = payload;
      })
      .addCase(getApplicationsBySearch.fulfilled, (state, { payload }) => {
        state.data = payload;
      })
      .addCase(deleteApplication.fulfilled, (state, { payload }) => {
        state.data = state.data.filter((item) => item.id !== payload);
      });
  },
});

export const { setSelectedApplications, selectAllApplications } = applicationSlice.actions;
