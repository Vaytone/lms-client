import React from 'react';
import { STATIC_HREF } from '@shared/constants/core';
import { useTranslation } from 'react-i18next';
import Button from '@components/ui/Button/Button';
import { useAppDispatch } from '@shared/hooks/redux';
import { logout } from '@modules/auth/redux/thunks';
import styles from './UserInactiveBanner.module.scss';

const UserInactiveBanner: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  
  const handleLogout = () => {
    dispatch(logout());
  };
  
  return (
    <div className={styles.BannerHolder}>
      <div className={styles.BannerWrapper}>
        <div className={styles.BannerContent}>
          <img
            src={`${STATIC_HREF}/userInactiveBanner.svg`}
            alt='Inactive user banner'
            className={styles.BannerImg}
          />
          <h2 className={styles.BannerTitle}>{t('auth.accountInactiveTitle')}</h2>
          <p className={styles.BannerText}>{t('auth.accountInactiveText')}</p>
          
          <Button text={t('auth.logout')} onClick={handleLogout}/>
        </div>
      </div>
    </div>
  );
};

export default UserInactiveBanner;
