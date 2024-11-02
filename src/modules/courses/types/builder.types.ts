export enum BuilderTemplateIDSEnum {
  Heading = 'headingTemplate',
}

export enum BuilderBlockTypeEnum {
  Text = 'text',
  Heading = 'heading',
  Comment = 'comment',
  Divider = 'divider',
}

export interface BuilderTemplate {
  id: BuilderTemplateIDSEnum,
  name: string,
}

export interface BaseCourseItem {
  id: string,
}

export interface HeadingCourseItem extends BaseCourseItem {
  data: {
    type: BuilderBlockTypeEnum.Heading,
    text: string,
  }
}

export type CourseItem = HeadingCourseItem;
