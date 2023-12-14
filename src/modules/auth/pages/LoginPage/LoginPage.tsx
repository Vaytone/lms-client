import React from 'react';
import LoginForm from '@modules/auth/components/LoginForm/LoginForm';
import styles from './LoginPage.module.scss';

const LoginPage: React.FC = () => {
  return (
    <div className={styles.LoginWrapper}>
      <LoginForm/>
    </div>
  );
};

export default LoginPage;
