import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { STATIC_HREF } from '@shared/constants/core';
import { useAppSelector } from '@shared/hooks/redux';
import UserInactiveBanner from '@src/layouts/AuthLayout/UserInactiveBanner/UserInactiveBanner';
import styles from './AuthLayout.module.scss';

const AuthLayout: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.active) {
      navigate('/');
    }
  }, [user]);
  
  return (
    <div className={styles.AuthHeader}>
      <div className={styles.AuthContent}>
        <div className={styles.AuthLogo}>
          <img src={`${STATIC_HREF}/logo.svg`} alt='logo'/>
          <p className={styles.AuthLogoText}>
            VAYTONE
            <br/>
            LMS
          </p>
        </div>
      </div>
      {user && !user.active && <UserInactiveBanner/>}
      {!user && <Outlet/>}
    </div>
  );
};

export default AuthLayout;
