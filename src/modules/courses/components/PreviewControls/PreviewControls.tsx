import React from 'react';
import styles from './PreviewControls.module.scss';
import Button from '@components/ui/Button/Button';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import BackButton from '@components/ui/BackButton/BackButton';

const PreviewControls: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Back}>
        <BackButton/>
      </div>
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

export default PreviewControls;
