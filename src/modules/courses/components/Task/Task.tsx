import React, { memo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import cn from 'classnames';
import { DotsSixVertical } from '@phosphor-icons/react';
import styles from './Task.module.scss';

type Props = {
  item: any,
  isActive: boolean,
}

const Task: React.FC<Props> = ({ item, isActive }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div
      ref={setNodeRef}
      className={cn(styles.Task, isActive && styles.TaskActive)}
      {...listeners}
      {...attributes}
    >
      <div className={cn(styles.ItemWrapper, isActive && styles.ItemWrapperActive)} style={style}>
        <div
          className={styles.DragIconWrapper}
        >
          <DotsSixVertical size={32} className={styles.DragIcon}/>
        </div>
        
        <div className={styles.Content}>
          <p>{item.data.text}</p>
        </div>
      </div>
    
    </div>
  );
};

export default memo(Task);
