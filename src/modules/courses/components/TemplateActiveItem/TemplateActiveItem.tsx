import React, { useMemo } from 'react';
import { BUILDER_ICONS } from '@modules/courses/constants/builder.icons';
import { BUILDER_TEMPLATES } from '@modules/courses/constants/builder';
import { useTranslation } from 'react-i18next';
import styles from './TemplateActiveItem.module.scss';

type Props = {
  id: string;
}

const TemplateActiveItem: React.FC<Props> = ({ id }) => {
  const item = useMemo(() => BUILDER_TEMPLATES.find((item) => item.id === id), [id]);
  const { t } = useTranslation();
  
  return (
    <div
      className={styles.Item}
    >
      {BUILDER_ICONS[id]}
      <p className={styles.ItemText}>{t(`courses.${item.name}`)}</p>
    </div>
  );
};

export default TemplateActiveItem;
