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
  
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id.toString(),
  });
  
  return (
    <div
      ref={setNodeRef}
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
