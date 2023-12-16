import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@shared/hooks/redux';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@components/Sidebar/Sidebar';
import Header from '@components/Header/Header';
import styles from './RequiredAuthLayout.module.scss';

const RequiredAuthLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user || !user.active) {
      navigate('/login');
    }
  }, [user?.id]);
  
  return (
    <div className={styles.LayoutWrapper}>
      <Sidebar isOpen={isSidebarOpen} setOpen={setSidebarOpen}/>
      <div className={styles.ContentWrapper}>
        <Header setOpen={setSidebarOpen} isOpen={isSidebarOpen}/>
        <p>bii</p>
      </div>
    </div>
  );
};

export default RequiredAuthLayout;
