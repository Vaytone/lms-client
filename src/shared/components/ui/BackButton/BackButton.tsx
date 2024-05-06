import React from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { BackButtonProps } from '@components/ui/BackButton/types';
import styles from './BackButton.module.scss';

const BackButton: React.FC<BackButtonProps> = ({onBack}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const handleClick = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };
  
  return (
    <div className={styles.BackButtonWrapper} onClick={handleClick}>
      <div className={styles.BackButtonContent}>
        <span className={cn(styles.BackButtonIcon, 'icon-left-big')}/>
        <span className={styles.BackButtonText}>{t('core.back')}</span>
      </div>
    </div>
  );
};

export default BackButton;
