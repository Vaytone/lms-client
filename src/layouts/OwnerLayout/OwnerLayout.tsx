import React, { useEffect } from 'react';
import { useAppSelector } from '@shared/hooks/redux';
import { RoleEnum } from '@type/role.types';
import { Outlet, useNavigate } from 'react-router-dom';

const OwnerLayout: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user?.role !== RoleEnum.Owner) {
      navigate('/');
    }
  }, []);
  
  return (
    <div>
      {user && <Outlet/>}
    </div>
  );
};

export default OwnerLayout;
