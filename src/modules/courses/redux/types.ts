import { CourseItem } from '@modules/courses/types/builder.types';

export interface CourseBuilderState {
  main: {
    title: string,
    description: string,
  },
  items: Record<string, CourseItem>,
}
