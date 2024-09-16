import React, { useMemo } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Task from '@modules/courses/components/Task/Task';
import { useDroppable } from '@dnd-kit/core';
import styles from './Column.module.scss';
import cn from 'classnames';

type Props = {
  items: any[]
  id: string,
  activeId: string | null,
  isOverMe: boolean,
}

const containerStyle = {
  background: '#dadada',
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'column',
};

const Column: React.FC<Props> = ({ items, id, activeId, isOverMe }) => {
  const { setNodeRef } = useDroppable({
    id,
  });
  
  // console.log(isOverMe, id);
  
  return (
    <div className={styles.Column}>
      <SortableContext
        id={id}
        items={items}
        strategy={verticalListSortingStrategy}
      >
        <div className={styles.Wrapper}>
          <div ref={setNodeRef} className={cn(styles.Container, isOverMe && styles.ContainerIsOver)}>
            {items.map((item) => (
              <Task isActive={activeId === item.id} key={item.id} item={item}/>
            ))}
          </div>
          
          {isOverMe && (
            <div className={styles.ContainerOver}>
              <span className='icon-drag'/>
              <p>Drop here</p>
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
};

export default Column;
