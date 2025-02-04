import React from 'react';
import { useAppSelector } from '@shared/hooks/redux';
import { selectCourseItemById } from '@modules/courses/redux/selectors';
import {
  BuilderBlockTypeEnum, CommentCourseItem,
  CourseItem, DividerCourseItem, FileCourseItem,
  HeadingCourseItem, ImageCourseItem,
  TextCourseItem,
} from '@modules/courses/types/builder.types';
import TextContentBlock from '@modules/courses/components/CourseContent/TextContentBlock/TextContentBlock';
import HeadingContentBlock from '@modules/courses/components/CourseContent/HeadingContentBlock/HeadingContentBlock';
import CommentContentBlock from '@modules/courses/components/CourseContent/CommentContentBlock/CommentContentBlock';
import ImageContentBlock from '@modules/courses/components/CourseContent/ImageContentBlock/ImageContentBlock';
import DividerContentBlock from '@modules/courses/components/CourseContent/DividerContentBlock/DividerContentBlock';
import FileContentBlock from '@modules/courses/components/CourseContent/FileContentBlock/FileContentBlock';

type Props = {
  id: string,
}

const CourseContent: React.FC<Props> = ({ id }) => {
  const content = useAppSelector((state) => selectCourseItemById(id)(state)) as CourseItem;
  
  const generateContent = () => {
    switch (content.data.type) {
    case BuilderBlockTypeEnum.Text:
      return <TextContentBlock item={content as TextCourseItem}/>;
    case BuilderBlockTypeEnum.Heading:
      return <HeadingContentBlock item={content as HeadingCourseItem}/>;
    case BuilderBlockTypeEnum.Comment:
      return <CommentContentBlock item={content as CommentCourseItem}/>;
    case BuilderBlockTypeEnum.Image:
      return <ImageContentBlock item={content as ImageCourseItem}/>;
    case BuilderBlockTypeEnum.Divider:
      return <DividerContentBlock/>;
    case BuilderBlockTypeEnum.File:
      return <FileContentBlock item={content as FileCourseItem}/>;
    default:
      return null;
    }
  };
  
  return (
    <>
      {generateContent()}
    </>
  );
};

export default CourseContent;
