import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  main: {
    title: '',
    description: '',
  },
  items: [],
};

export const courseBuilderSlice = createSlice({
  name: 'courseBuilder',
  initialState,
  reducers: {
    setMainInfo: (state, { payload }) => {
      state.main[payload.key] = payload.value;
    },
    addCourseItem: (state, { payload }) => {
      state.items = [...state.items, payload];
    },
  },
  extraReducers: {},
});

export const { setMainInfo } = courseBuilderSlice.actions;
