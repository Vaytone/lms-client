import React from 'react';
import { STATIC_HREF } from '@shared/constants/core';
import { useTranslation } from 'react-i18next';
import styles from './InvalidLinkBanner.module.scss';

const InvalidLinkBanner: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className={styles.BannerWrapper}>
      <div className={styles.BannerContent}>
        <img
          src={`${STATIC_HREF}/invalidLinkBanner.svg`}
          alt='Invalid link banner'
          className={styles.BannerImg}
        />
        <h2 className={styles.BannerTitle}>{t('auth.invalidLinkTitle')}</h2>
        <p className={styles.BannerText}>{t('auth.invalidLinkText')}</p>
    
      </div>
    </div>
  );
};

export default InvalidLinkBanner;
