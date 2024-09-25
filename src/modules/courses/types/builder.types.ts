import { a } from 'vite/dist/node/types.d-aGj9QkWt';

export interface BuilderBlock {
  id: string,
  dragId: string,
  type: string,
  data: {
    title: string,
    icon: string,
  },
  dataToAdd: Record<string, string>
}

export interface CourseForm {
  title: string,
  description: string,
}

export interface TitleBlock {
  type: 'titleBlock',
  title: string,
}

type BuilderItem = TitleBlock | any;

export interface BuilderItems {
  componentList: BuilderBlock[],
  [key: string]: BuilderItem[];
}

export interface BlocksData {
  id: string,
  [key: string]: any,
}
