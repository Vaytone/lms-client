import React, { memo, useCallback, useContext } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { selectCourseItemById } from '@modules/courses/redux/selectors';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux';
import HeadingBuilderTemplate
  from '@modules/courses/components/CourseBuilderItemTemplates/HeadingBuilderTemplate/HeadingBuilderTemplate';
import cn from 'classnames';
import { List, Trash } from '@phosphor-icons/react';
import { BuilderBlockTypeEnum } from '@modules/courses/types/builder.types';
import TextBuilderTemplate
  from '@modules/courses/components/CourseBuilderItemTemplates/TextBuilderTemplate/TextBuilderTemplate';
import CommentBuilderTemplate
  from '@modules/courses/components/CourseBuilderItemTemplates/CommentBuilderTemplate/CommentBuilderTemplate';
import ImageBuilderTemplate
  from '@modules/courses/components/CourseBuilderItemTemplates/ImageBuilderTemplate/ImageBuilderTemplate';
import { removeCourseItem } from '@modules/courses/redux/slice';
import DividerBuilderTemplate
  from '@modules/courses/components/CourseBuilderItemTemplates/DividerBuilderTemplate/DividerBuilderTemplate';
import FileBuilderTemplate
  from '@modules/courses/components/CourseBuilderItemTemplates/FileBuilderTemplate/FileBuilderTemplate';
import styles from './CourseBuilderItem.module.scss';
import { BUILDER_IMAGES_KEY } from '@modules/courses/constants/builder';
import { BuilderContext } from '@modules/courses/context/BuilderContext';

type Props = {
  id: string,
  containerId: string,
}

const CourseBuilderItem: React.FC<Props> = ({ id, containerId }) => {
  const content = useAppSelector((state) => selectCourseItemById(id)(state));
  const { files, setFiles, iDb } = useContext(BuilderContext);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  const dispatch = useAppDispatch();
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
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
  
  const handleRemove = () => {
    dispatch(removeCourseItem({
      id,
      containerId,
    }));
    
    setFiles((prev) => {
      return [...prev.filter((fileItem) => fileItem.itemId !== id)];
    });
    
    if (iDb) {
      const transaction = iDb.transaction(BUILDER_IMAGES_KEY, 'readwrite');
      const store = transaction.objectStore(BUILDER_IMAGES_KEY);

      const deleteRequest = store.index('itemId').openCursor(IDBKeyRange.only(id));

      deleteRequest.onsuccess = (event: Event) => {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          store.delete(cursor.primaryKey);
          cursor.continue();
        }
      };
    }
  };
  
  return (
    <div
      id={id}
      className={cn(styles.Wrapper, isDragging && styles.ItemWrapperActive)}
      {...attributes}
      ref={setNodeRef}
      draggable={false}
    >
      <div className={styles.ItemWrapper} style={style}>
        <div
          className={styles.DragIconWrapper}
          {...listeners}
        >
          <List size={24} className={styles.DragIcon}/>
        </div>
        
        <div className={styles.Content}>
          <div className={styles.Delete}>
            <Trash size={20} onClick={handleRemove}/>
          </div>
          
          {generateContent()}
        </div>
        
      </div>
    </div>
  );
};

export default memo(CourseBuilderItem);
