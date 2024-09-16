import React, { useEffect } from 'react';
import { useAppSelector } from '@shared/hooks/redux';
import { RoleEnum } from '@type/role.types';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './AdminLayout.module.scss';

const AdminLayout: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user?.role !== RoleEnum.Admin) {
      navigate('/');
    }
  }, []);
  
  return (
    <div className={styles.OwnerWrapper}>
      {user && <Outlet/>}
    </div>
  );
};

export default AdminLayout;
