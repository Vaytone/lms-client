import React, { useEffect } from 'react';
import { useAppDispatch } from '@shared/hooks/redux';
import { PageEnum } from '@type/page.types';
import { setCurrentPage } from '@shared/redux/core/slice';
import ApplicationControls from '@modules/applications/components/ApplicationControls/ApplicationControls';
import ApplicationList from '@modules/applications/components/ApplicationList/ApplicationList';
import ApplicationChart from '@modules/applications/components/ApplicationChart/ApplicationChart';
import styles from './ApplicationsPage.module.scss';

const ApplicationsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(setCurrentPage(PageEnum.Applications));
  }, []);
  
  return (
    <div>
      <ApplicationControls/>
      <div className={styles.PageWrapper}>
        <ApplicationList/>
        <ApplicationChart/>
      </div>
    </div>
  );
};

export default ApplicationsPage;
