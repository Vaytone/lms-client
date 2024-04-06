import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux';
import { appFirstLoad } from '@shared/redux/core/thunks';
import styles from './App.module.scss';
import RequiredAuthLayout from '@src/layouts/RequiredAuthLayout/RequiredAuthLayout';
import DashboardPage from '@modules/dashboard/pages/DashboardPage/DashboardPage';
import MembersPage from '@modules/members/pages/MembersPage/MembersPage';
import OwnerLayout from '@src/layouts/OwnerLayout/OwnerLayout';
import ApplicationsPage from '@modules/members/pages/ApplicationsPage/ApplicationsPage';
import AuthLayout from '@src/layouts/AuthLayout/AuthLayout';
import LoginPage from '@modules/auth/pages/LoginPage/LoginPage';
import RegisterPage from '@modules/auth/pages/RegisterPage/RegisterPage';
import Loader from '@components/Loader/Loader';

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
