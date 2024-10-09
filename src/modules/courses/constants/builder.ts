import { BuilderBlock, BuilderBlockType } from '@modules/courses/types/builder.types';
import i18n from 'i18next';

const { t } = i18n;

export const BUILDER_BLOCKS: BuilderBlock[] = [
  {
    id: 'textElemBlock',
    dragId: 'builderBlock',
    type: 'text',
    data: {
      title: t('courses.text'),
      icon: 'text',
    },
    dataToAdd: {
      type: BuilderBlockType.Text,
      text: '',
    },
  },
  {
    id: 'headingBlock',
    dragId: 'builderBlock',
    type: 'heading',
    data: {
      title: t('courses.heading'),
      icon: 'heading',
    },
    dataToAdd: {
      type: BuilderBlockType.Heading,
      text: '',
    },
  },
  {
    id: 'commentBlock',
    dragId: 'builderBlock',
    type: 'comment',
    data: {
      title: t('courses.comment'),
      icon: 'comment',
    },
    dataToAdd: {
      type: BuilderBlockType.Comment,
      text: '',
      author: '',
    },
  },
  {
    id: 'dividerBlock',
    dragId: 'builderBlock',
    type: 'divider',
    data: {
      title: t('courses.divider'),
      icon: 'divider',
    },
    dataToAdd: {
      type: BuilderBlockType.Divider,
    },
  },
  {
    id: 'imageBlock',
    dragId: 'imageBlock',
    type: 'image',
    data: {
      title: t('courses.image'),
      icon: 'image',
    },
    dataToAdd: {
      type: BuilderBlockType.Image,
      fileId: null,
      description: '',
    },
  },
];

export const BUILDER_IDS = BUILDER_BLOCKS.map((item) => item.id);

export enum BuilderAreasEnum {
  ComponentList = 'componentList',
  AddButton = 'addButton'
}

export const BUILDER_SAVE_DATA_KEY = 'VAYTONE_BUILDER_SAVE_DATA';

export const BUILDER_IMAGES_INDEXED_DB_KEY = 'vaytoneBuilderImages';
export const BUILDER_IMAGES_KEY = 'vaytoneCourseImages';
