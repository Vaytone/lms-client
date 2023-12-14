import React from 'react';
import { RoleEnum } from '@type/role.types';
import { STATIC_HREF } from '@shared/constants/core';
import { RegisterBannerProps } from '@modules/auth/components/RegisterBanner/types';
import { useTranslation } from 'react-i18next';
import { REGISTER_ADMIN_TEXT, REGISTER_STUDENT_TEXT, REGISTER_WATCHER_TEXT } from '@modules/auth/constants/registerText';
import styles from './RegisterBanner.module.scss';

const getBannerTextArr = (role: RoleEnum): string[] => {
  switch (role) {
  case RoleEnum.Admin:
    return REGISTER_ADMIN_TEXT;
  case RoleEnum.Watcher:
    return REGISTER_WATCHER_TEXT;
  case RoleEnum.Student:
    return REGISTER_STUDENT_TEXT;
  default:
    return REGISTER_STUDENT_TEXT;
  }
};

const RegisterBanner: React.FC<RegisterBannerProps> = ({ role }) => {
  const { t } = useTranslation();
  const textArr = getBannerTextArr(role);
  
  const generateBannerLink = () => {
    switch (role) {
    case RoleEnum.Admin:
      return `${STATIC_HREF}/registerBannerAdmin.png`;
    case RoleEnum.Watcher:
      return `${STATIC_HREF}/registerBannerWatcher.png`;
    case RoleEnum.Student:
      return `${STATIC_HREF}/registerBannerStudent.png`;
    default:
      return `${STATIC_HREF}/registerBannerStudent.png`;
    }
  };
  
  return (
    <div className={styles.RegisterBannerWrapper}>
      <div className={styles.RegisterBannerTextWrapper}>
        <h2>
          {t('auth.registerTitle')}
        </h2>
        <ul className={styles.RegisterBannerList}>
          {textArr.map((item) => {
            return (
              <li key={item}>
                <span className='icon-check'/>
                {t(item)}
              </li>
            );
          })}
        </ul>
      </div>
      <img src={generateBannerLink()} alt='Register banner'/>
    </div>
  );
};

export default RegisterBanner;
