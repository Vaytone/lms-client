import React, { useEffect } from 'react';
import LoginForm from '@modules/auth/components/LoginForm/LoginForm';
import { useAppSelector } from '@shared/hooks/redux';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.scss';

const LoginPage: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user && user.active) {
      navigate('/');
    }
  }, [user]);
  
  return (
    <div className={styles.LoginWrapper}>
      <LoginForm/>
    </div>
  );
};

export default LoginPage;
