import React, { useEffect } from 'react';
import { useAppSelector } from '@shared/hooks/redux';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '@components/Sidebar/Sidebar';
import Header from '@components/Header/Header';
import styles from './RequiredAuthLayout.module.scss';

const RequiredAuthLayout: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user || !user.active) {
      navigate('/login');
    }
  }, [user?.id]);
  
  return (
    <div className={styles.LayoutWrapper}>
      <Sidebar/>
      <div className={styles.ContentWrapper}>
        <Header/>
        <div className={styles.ContentHolder}>
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default RequiredAuthLayout;
