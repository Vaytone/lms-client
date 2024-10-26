import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux';
import Loader from '@components/Loader/Loader';
import { appFirstLoad } from '@shared/redux/core/thunks';
import Navigation from '@src/navigation/Navigation';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { SkeletonTheme } from 'react-loading-skeleton';
import { THEME_LOCAL_STORAGE_KEY } from '@shared/constants/core';
import { setTheme } from '@shared/redux/core/slice';
import { ToastContainer } from 'react-toastify';
import styles from './App.module.scss';

export const App: React.FC = () => {
  const isLoading = useAppSelector((state) => state.core.isLoading);
  const currentPage = useAppSelector((state) => state.core.currentPage);
  const theme = useAppSelector((state) => state.core.theme);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  
  const change = () => {
    dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'));
    localStorage.setItem(THEME_LOCAL_STORAGE_KEY, theme === 'dark' ? 'light' : 'dark');
  };
  
  useEffect(() => {
    dispatch(appFirstLoad());
  }, []);
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
  }, [theme]);
  
  useEffect(() => {
    document.title = `Vaytone LMS | ${t(`core.${currentPage}`)}`;
  }, [currentPage]);
  
  return (
    <div className={cn(styles.App)}>
      <SkeletonTheme baseColor={theme === 'light' ? '#eeeff3' : '#484848'} highlightColor={theme === 'light' ? '#e9eaef' : '#333333'}>
        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          theme={theme}
        />
        <button className={styles.Button} onClick={change}>Change theme</button>
        {!isLoading && (
          <Navigation/>
        )}
        {isLoading && <Loader/>}
      </SkeletonTheme>
    </div>
  );
};
