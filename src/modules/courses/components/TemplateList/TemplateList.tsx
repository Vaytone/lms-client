import React from 'react';
import { BUILDER_TEMPLATES } from '@modules/courses/constants/builder';
import { useTranslation } from 'react-i18next';
import TemplateItem from '@modules/courses/components/TemplateItem/TemplateItem';
import styles from './TemplateList.module.scss';

const TemplateList: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className={styles.TemplateAside}>
      <h4 className={styles.Title}>{t('courses.dragTitle')}</h4>
      {BUILDER_TEMPLATES.map((item) => (
        <TemplateItem key={item.id} item={item}/>
      ))}
    </div>
  );
};

export default TemplateList;
