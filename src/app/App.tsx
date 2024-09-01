import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux';
import Loader from '@components/Loader/Loader';
import { appFirstLoad } from '@shared/redux/core/thunks';
import Navigation from '@src/navigation/Navigation';
import styles from './App.module.scss';
import { useTranslation } from 'react-i18next';

export const App: React.FC = () => {
  const isLoading = useAppSelector((state) => state.core.isLoading);
  const currentPage = useAppSelector((state) => state.core.currentPage);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  
  useEffect(() => {
    dispatch(appFirstLoad());
  }, []);
  
  useEffect(() => {
    document.title = `Vaytone LMS | ${t(`core.${currentPage}`)}`;
  }, [currentPage]);
  
  return (
    <div className={styles.App}>
      {!isLoading && (
        <Navigation/>
      )}
      {isLoading && <Loader/>}
    </div>
  );
};
