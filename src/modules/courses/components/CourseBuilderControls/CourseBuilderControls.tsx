import React from 'react';
import Button from '@components/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import styles from './CourseBuilderControls.module.scss';

const CourseBuilderControls: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className={styles.Wrapper}>
      <div className={styles.ControlButton}>
        <Button
          icon='icon-upload'
          text={t('core.publish')}
          onClick={() => null}
        />
      </div>
    </div>
  );
};

export default CourseBuilderControls;
