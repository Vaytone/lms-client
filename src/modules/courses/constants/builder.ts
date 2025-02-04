import {
  BuilderBlockTypeEnum,
  BuilderTemplate,
  BuilderTemplateIDSEnum,
} from '@modules/courses/types/builder.types';

export const BUILDER_IMAGES_INDEXED_DB_KEY = 'vaytoneBuilderImages';
export const BUILDER_IMAGES_KEY = 'vaytoneCourseImages';
export const BUILDER_SAVE_DATA_KEY = 'VAYTONE_BUILDER_SAVE_DATA';

export const BUILDER_TEMPLATES: BuilderTemplate[] = [
  {
    id: BuilderTemplateIDSEnum.Heading,
    name: 'heading',
  },
  {
    id: BuilderTemplateIDSEnum.Text,
    name: 'text',
  },
  {
    id: BuilderTemplateIDSEnum.Comment,
    name: 'comment',
  },
  {
    id: BuilderTemplateIDSEnum.Image,
    name: 'image',
  },
  {
    id: BuilderTemplateIDSEnum.Divider,
    name: 'divider',
  },
  {
    id: BuilderTemplateIDSEnum.File,
    name: 'file',
  },
];

export const BUILDER_TEMPLATES_DATA_TO_ADD = {
  [BuilderTemplateIDSEnum.Heading]: {
    text: '',
    type: BuilderBlockTypeEnum.Heading,
  },
  [BuilderTemplateIDSEnum.Text]: {
    text: '',
    type: BuilderBlockTypeEnum.Text,
  },
  [BuilderTemplateIDSEnum.Comment]: {
    text: '',
    author: '',
    type: BuilderBlockTypeEnum.Comment,
  },
  [BuilderTemplateIDSEnum.Image]: {
    fileId: '',
    description: '',
    type: BuilderBlockTypeEnum.Image,
  },
  [BuilderTemplateIDSEnum.File]: {
    fileId: '',
    type: BuilderBlockTypeEnum.File,
  },
  [BuilderTemplateIDSEnum.Divider]: {
    type: BuilderBlockTypeEnum.Divider,
  },
};

export const BUILDER_TEMPLATE_IDS: string[] = BUILDER_TEMPLATES.map((item) => item.id);
