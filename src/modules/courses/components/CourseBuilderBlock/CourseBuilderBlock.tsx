import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import CourseBuilderItem from '@modules/courses/components/CourseBuilderItem/CourseBuilderItem';
import { useDroppable } from '@dnd-kit/core';
import styles from './CourseBuilderBlock.module.scss';

type Props = {
  items: string[],
  id: string,
};

const CourseBuilderBlock: React.FC<Props> = ({ items, id }) => {
  const { setNodeRef } = useDroppable({
    id,
  });
  
  return (
    <SortableContext
      id={id}
      items={items}
      strategy={verticalListSortingStrategy}
    >
      <div ref={setNodeRef} className={styles.Wrapper}>
        {items.map((id) => (
          <CourseBuilderItem key={id} id={id} />
        ))}
      </div>
    </SortableContext>
  );
};

export default CourseBuilderBlock;
