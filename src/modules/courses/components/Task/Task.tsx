import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import cn from 'classnames';
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
      style={style}
      className={cn(styles.Task, isActive && styles.TaskActive)}
      {...attributes}
      {...listeners}
    >
      <div className={cn(styles.Content, isActive && styles.ContentActive)}>
        <p>{item.data.text}</p>
      </div>
    </div>
  );
};

export default Task;
