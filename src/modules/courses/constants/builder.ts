import { BuilderBlock } from '@modules/courses/types/builder.types';

export const BUILDER_BLOCKS: BuilderBlock[] = [
  {
    id: 'textElemBlock',
    dragId: 'builderBlock',
    type: 'text',
    data: {
      title: 'Text',
      icon: 'text',
    },
    dataToAdd: {
      type: 'text',
      text: '',
    },
  },
  {
    id: 'headingBlock',
    dragId: 'builderBlock',
    type: 'heading',
    data: {
      title: 'Heading',
      icon: 'heading',
    },
    dataToAdd: {
      type: 'heading',
      text: '',
    },
  },
];

export const BUILDER_IDS = BUILDER_BLOCKS.map((item) => item.id);

export const BUILDER_BLOCKS_TO_ADD = [
  {
    id: 'textElemBlock',
    data: {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
  },
  {
    id: 'photoBlock',
    data: {
      uri: 'https://dummyimage.com/600x400/000/fff',
    },
  },
];

export const COMPONENTS_LIST = 'componentList';
