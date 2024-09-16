import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import BuilderItem from '@modules/courses/components/BuilderItem/BuilderItem';
import { BuilderBlock } from '@modules/courses/types/builder.types';
import styles from './ComponentsList.module.scss';

type Props = {
  items: BuilderBlock[]
}

const ComponentsList: React.FC<Props> = ({ items }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: 2323,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <aside className={styles.Aside}>
      <p className={styles.Title}>Drag and drop elements</p>
      <div className={styles.Divider}/>
      
      <SortableContext
        id='componentList'
        items={items}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className={styles.List}>
          {items.map((item) => (
            <BuilderItem item={item} key={item.id}/>
          ))}
        </div>
      </SortableContext>
    </aside>
  );
};

export default ComponentsList;
