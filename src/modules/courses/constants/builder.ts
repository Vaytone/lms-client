import { BuilderTemplate, BuilderTemplateIDSEnum } from '@modules/courses/types/builder.types';

export const BUILDER_IMAGES_INDEXED_DB_KEY = 'vaytoneBuilderImages';
export const BUILDER_IMAGES_KEY = 'vaytoneCourseImages';

export const BUILDER_TEMPLATES: BuilderTemplate[] = [
  {
    id: BuilderTemplateIDSEnum.Heading,
    name: 'heading',
  },
];

export const BUILDER_TEMPLATE_IDS: string[] = BUILDER_TEMPLATES.map((item) => item.id);
