import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './DividerBuilderTemplate.module.scss';

const DividerBuilderTemplate: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Divider}/>
      <p className={styles.Text}>{t('courses.divider')}</p>
      <div className={styles.Divider} />
    </div>
  );
};

export default DividerBuilderTemplate;
