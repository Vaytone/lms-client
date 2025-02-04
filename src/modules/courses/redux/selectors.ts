import { createSelector } from 'reselect';
import { RootState } from '@src/store';

const selectItems = (state: RootState) => state.courseBuilder.items;

export const selectCourseItemById = (id: string) => createSelector(
  [selectItems],
  (items) => items[id],
);
