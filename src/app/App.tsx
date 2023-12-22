import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '@modules/auth/pages/LoginPage/LoginPage';
import AuthLayout from '@src/layouts/AuthLayout/AuthLayout';
import RegisterPage from '@modules/auth/pages/RegisterPage/RegisterPage';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux';
import { appFirstLoad } from '@shared/redux/core/thunks';
import RequiredAuthLayout from '@src/layouts/RequiredAuthLayout/RequiredAuthLayout';
import Loader from '@components/Loader/Loader';
import ApplicationsPage from '@modules/members/pages/ApplicationsPage/ApplicationsPage';
import styles from './App.module.scss';
import MembersPage from '@modules/members/pages/MembersPage/MembersPage';
import OwnerLayout from '@src/layouts/OwnerLayout/OwnerLayout';
import DashboardPage from '@modules/dashboard/pages/DashboardPage/DashboardPage';

export const App: React.FC = () => {
  const isLoading = useAppSelector((state) => state.core.isLoading);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(appFirstLoad());
  }, []);
  
  return (
    <div className={styles.App}>
      {!isLoading && (
        <Routes>
          <Route path='/' element={<RequiredAuthLayout/>}>
            <Route path='/' element={<DashboardPage/>} />
            <Route path='/members' element={<MembersPage/>} />
            
            <Route path='/' element={<OwnerLayout/>}>
              <Route path='/applications' element={<ApplicationsPage/>}/>
            </Route>
          </Route>
          <Route path='/' element={<AuthLayout/>}>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register/:code' element={<RegisterPage/>}/>
          </Route>
        </Routes>
      )}
      {isLoading && <Loader/>}
    </div>
  );
};
