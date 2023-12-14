import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '@modules/auth/pages/LoginPage/LoginPage';
import AuthLayout from '@src/layouts/AuthLayout/AuthLayout';
import RegisterPage from '@modules/auth/pages/RegisterPage/RegisterPage';
import { useAppDispatch } from '@shared/hooks/redux';
import { appFirstLoad } from '@shared/redux/core/thunks';
import styles from './App.module.scss';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(appFirstLoad());
  }, []);
  
  return (
    <div className={styles.App}>
      <Routes>
        <Route path='/' element={<AuthLayout/>}>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register/:code' element={<RegisterPage/>}/>
        </Route>
      </Routes>
      
    </div>
  );
};
