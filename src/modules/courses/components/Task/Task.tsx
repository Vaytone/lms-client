import React, { memo, useCallback, useContext } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import cn from 'classnames';
import { List, Trash } from '@phosphor-icons/react';
import {
  BuilderBlockType,
  BuilderItem,
  CommentBlock, DividerBlock,
  HeadingBlock,
  TitleBlock,
} from '@modules/courses/types/builder.types';
import TextContentBlock from '@modules/courses/components/ContentBlocks/TextContentBlock/TextContentBlock';
import HeadingContentBlock from '@modules/courses/components/ContentBlocks/HeadingContentBlock/HeadingContentBlock';
import { BuilderContext } from '@modules/courses/contexts/BuilderContext';
import CommentContentBlock from '@modules/courses/components/ContentBlocks/CommentContentBlock/CommentContentBlock';
import DividerContentBlock from '@modules/courses/components/ContentBlocks/DividerContentBlock/DividerContentBlock';
import styles from './Task.module.scss';

type Props = {
  item: BuilderItem,
  isActive: boolean,
}

const Task: React.FC<Props> = ({ item, isActive }) => {
  const { removeItem } = useContext(BuilderContext);
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  const generateContent = useCallback(() => {
    switch (item.data.type) {
    case BuilderBlockType.Text:
      return <TextContentBlock item={item as TitleBlock}/>;
    case BuilderBlockType.Heading:
      return <HeadingContentBlock item={item as HeadingBlock}/>;
    case BuilderBlockType.Comment:
      return <CommentContentBlock item={item as CommentBlock}/>;
    case BuilderBlockType.Divider:
      return <DividerContentBlock item={item as DividerBlock}/>;
    default:
      return null;
    }
  }, [item]);
  
  const handleRemove = () => {
    removeItem(item.id);
  };
  
  return (
    <div
      className={cn(styles.Task, isActive && styles.TaskActive)}
      {...attributes}
      ref={setNodeRef}
      draggable={false}
    >
      <div className={cn(styles.ItemWrapper, isActive && styles.ItemWrapperActive)} style={style}>
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

export default memo(Task);
