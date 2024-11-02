import { createSlice } from '@reduxjs/toolkit';
import { CourseBuilderState } from '@modules/courses/redux/types';

const initialState: CourseBuilderState = {
  main: {
    title: '',
    description: '',
  },
  items: {},
};

export const courseBuilderSlice = createSlice({
  name: 'courseBuilder',
  initialState,
  reducers: {
    setMainInfo: (state, { payload }) => {
      state.main[payload.key] = payload.value;
    },
    addCourseItem: (state, { payload }) => {
      state.items = {
        ...state.items,
        [payload.id]: payload,
      };
    },
    changeCourseItem: (state, { payload }) => {
      state.items[payload.id].data[payload.key] = payload.value;
    },
  },
  extraReducers: {},
});

export const { setMainInfo, addCourseItem, changeCourseItem } = courseBuilderSlice.actions;
