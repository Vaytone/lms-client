import React from 'react';
import { BUILDER_ICONS } from '@modules/courses/constants/builder.icons';
import { BuilderTemplate } from '@modules/courses/types/builder.types';
import { useTranslation } from 'react-i18next';
import { useDraggable } from '@dnd-kit/core'; // Імпортуємо useDraggable
import styles from './TemplateItem.module.scss';

type Props = {
  item: BuilderTemplate;
};

const TemplateItem: React.FC<Props> = ({ item }) => {
  const { name, id } = item;
  const { t } = useTranslation();
  
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id.toString(), // Унікальний ідентифікатор для draggable елемента
  });
  
  // const style = {
  //   transform: transform
  //     ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
  //     : undefined,
  // };
  
  return (
    <div
      ref={setNodeRef}
      // style={style}
      {...listeners}
      {...attributes}
      className={styles.Item}
    >
      {BUILDER_ICONS[id]}
      <p className={styles.ItemText}>{t(`courses.${name}`)}</p>
    </div>
  );
};

export default TemplateItem;
