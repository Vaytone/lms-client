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

interface ContentBlock {
  id: string;
}

export interface TitleBlock extends ContentBlock {
  data: {
    type: BuilderBlockType.Text,
    text: string,
  }
}

export interface HeadingBlock extends ContentBlock {
  data: {
    type: BuilderBlockType.Heading,
    text: string,
  }
}

export interface CommentBlock extends ContentBlock {
  data: {
    type: BuilderBlockType.Comment,
    text: string,
    author: string,
  }
}

export interface DividerBlock extends ContentBlock {
  data: {
    type: BuilderBlockType.Divider,
  }
}

export type BuilderItem = TitleBlock | HeadingBlock | CommentBlock | DividerBlock;

export interface BuilderItems {
  [key: string]: BuilderItem[];
}

export interface BlocksData {
  id: string,
  title: string,
}

export enum BuilderBlockType {
  Text = 'text',
  Heading = 'heading',
  Comment = 'comment',
  Divider = 'divider',
}

interface ExtendedBlockData extends BlocksData {
  items: BuilderItem[],
}

export interface CourseData {
  form: {
    title: string,
    description: string,
  },
  blocks: ExtendedBlockData[],
}
