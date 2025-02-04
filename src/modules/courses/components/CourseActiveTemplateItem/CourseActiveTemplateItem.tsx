import React, { useCallback } from 'react';
import { BuilderBlockTypeEnum } from '@modules/courses/types/builder.types';
import HeadingBuilderTemplate
  from '@modules/courses/components/CourseBuilderItemTemplates/HeadingBuilderTemplate/HeadingBuilderTemplate';
import TextBuilderTemplate
  from '@modules/courses/components/CourseBuilderItemTemplates/TextBuilderTemplate/TextBuilderTemplate';
import CommentBuilderTemplate
  from '@modules/courses/components/CourseBuilderItemTemplates/CommentBuilderTemplate/CommentBuilderTemplate';
import ImageBuilderTemplate
  from '@modules/courses/components/CourseBuilderItemTemplates/ImageBuilderTemplate/ImageBuilderTemplate';
import DividerBuilderTemplate
  from '@modules/courses/components/CourseBuilderItemTemplates/DividerBuilderTemplate/DividerBuilderTemplate';
import { useAppSelector } from '@shared/hooks/redux';
import { selectCourseItemById } from '@modules/courses/redux/selectors';
import cn from 'classnames';
import { List, Trash } from '@phosphor-icons/react';
import FileBuilderTemplate
  from '@modules/courses/components/CourseBuilderItemTemplates/FileBuilderTemplate/FileBuilderTemplate';
import styles from './CourseActiveTemplateItem.module.scss';

type Props = {
  id: string;
}

const CourseActiveTemplateItem: React.FC<Props> = ({ id }) => {
  const content = useAppSelector((state) => selectCourseItemById(id)(state));
  
  const generateContent = useCallback(() => {
    switch (content.data.type) {
    case BuilderBlockTypeEnum.Heading:
      return <HeadingBuilderTemplate id={id}/>;
    case BuilderBlockTypeEnum.Text:
      return <TextBuilderTemplate id={id}/>;
    case BuilderBlockTypeEnum.Comment:
      return <CommentBuilderTemplate id={id}/>;
    case BuilderBlockTypeEnum.Image:
      return <ImageBuilderTemplate id={id}/>;
    case BuilderBlockTypeEnum.Divider:
      return <DividerBuilderTemplate/>;
    case BuilderBlockTypeEnum.File:
      return <FileBuilderTemplate id={id}/>;
    default:
      return null;
    }
  }, [content.data.type]);
  
  return (
    <div
      id={id}
      className={cn(styles.Wrapper)}
      draggable={false}
    >
      <div className={styles.ItemWrapper}>
        <div
          className={styles.DragIconWrapper}
        >
          <List size={24} className={styles.DragIcon}/>
        </div>
        
        <div className={styles.Content}>
          <div className={styles.Delete}>
            <Trash size={20}/>
          </div>
          
          {generateContent()}
        </div>
      
      </div>
    </div>
  );
};

export default CourseActiveTemplateItem;
