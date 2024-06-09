import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux';
import Loader from '@components/Loader/Loader';
import { appFirstLoad } from '@shared/redux/core/thunks';
import Navigation from '@src/navigation/Navigation';
import styles from './App.module.scss';

export const App: React.FC = () => {
  const isLoading = useAppSelector((state) => state.core.isLoading);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(appFirstLoad());
  }, []);
  
  return (
    <div className={styles.App}>
      {!isLoading && (
        <Navigation/>
      )}
      {isLoading && <Loader/>}
    </div>
  );
};
