import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { BuilderBlock } from '@modules/courses/types/builder.types';
import { BUILDER_ICONS } from '@modules/courses/constants/builder.icons';
import styles from './BuilderItem.module.scss';

type Props = {
  item: BuilderBlock
}

const BuilderItem: React.FC<Props> = ({ item }) => {
  const { id, type, data } = item;
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={styles.Item}
      {...attributes}
      {...listeners}
    >
      {BUILDER_ICONS[item.data.icon]}
      <p className={styles.Title}>{data.title}</p>
    </div>
  );
};

export default BuilderItem;
