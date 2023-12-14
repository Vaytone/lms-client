import React, { useEffect } from 'react';
import { useAppSelector } from '@shared/hooks/redux';
import { useNavigate } from 'react-router-dom';

const RequiredAuthLayout: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user || !user.active) {
      navigate('/login');
    }
  }, [user?.id]);
  
  return (
    <div>
      <p>Open</p>
    </div>
  );
};

export default RequiredAuthLayout;
