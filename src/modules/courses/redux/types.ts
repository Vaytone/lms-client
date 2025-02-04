import { CourseItem } from '@modules/courses/types/builder.types';

export interface CourseBuilderState {
  main: {
    title: string,
    description: string,
  },
  isSaveCompleted: boolean,
  items: Record<string, CourseItem>,
  blocks: Record<string, string[]>
  blocksInfo: Record<string, {
    title: string,
  }>,
  blocksInfoErrors: Record<string, boolean>,
  errors: Record<string, ItemError[]>,
  validationTrigger: number,
}

interface ItemError {
  [key: string]: string
}
