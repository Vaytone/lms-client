import React from 'react';
import { DividerBlock } from '@modules/courses/types/builder.types';
import styles from './DividerContentBlock.module.scss';
import { useTranslation } from 'react-i18next';

type Props = {
  item: DividerBlock
}

const DividerContentBlock: React.FC<Props> = () => {
  const { t } = useTranslation();
  
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Divider}/>
      <p className={styles.Text}>{t('courses.divider')}</p>
      <div className={styles.Divider}></div>
    </div>
  );
};

export default DividerContentBlock;
