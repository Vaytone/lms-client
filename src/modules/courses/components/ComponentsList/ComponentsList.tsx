import React, { useEffect, useState } from 'react';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import BuilderItem from '@modules/courses/components/BuilderItem/BuilderItem';
import { BuilderBlock } from '@modules/courses/types/builder.types';
import { BuilderAreasEnum } from '@modules/courses/constants/builder';
import styles from './ComponentsList.module.scss';
import Modal from '@components/Modal/Modal';
import { useTranslation } from 'react-i18next';
import { Info } from '@phosphor-icons/react';

type Props = {
  items: BuilderBlock[]
}

const ComponentsList: React.FC<Props> = ({ items }) => {
  const { setNodeRef } = useSortable({
    id: BuilderAreasEnum.ComponentList,
  });
  const { t } = useTranslation();
  
  return (
    <aside
      className={styles.Aside}
      // style={{
      //   width: scrollbarWidth > 0 ? '350px' : `${scrollbarWidth + 350}px`,
      // }}
    >
      <div className={styles.Content}>
        <div className={styles.TitleWrapper}>
          <Info size={18}/>
          <p className={styles.Title}>{t('courses.dragTitle')}</p>
        </div>
        <div className={styles.Divider}/>
        
        <div className={styles.List}>
          {items.map((item) => (
            <BuilderItem item={item} key={item.id}/>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ComponentsList;
