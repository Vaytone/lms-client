import React, { useEffect } from 'react';
import styles from './ApplicationsPage.module.scss';
import { useAppDispatch } from '@shared/hooks/redux';
import { PageEnum } from '@type/page.types';
import { setCurrentPage } from '@shared/redux/core/slice';
import { getApplications } from '@modules/members/redux/applications/thunks';
import ApplicationTable from '@modules/members/components/ApplicationTable/ApplicationTable';
import ApplicationControls from '@modules/members/components/ApplicationControls/ApplicationControls';

const ApplicationsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(setCurrentPage(PageEnum.Applications));
    dispatch(getApplications());
  }, []);
  
  return (
    <div>
      <ApplicationControls/>
      <div className={styles.PageWrapper}>
        <ApplicationTable/>
      </div>
    </div>
  );
};

export default ApplicationsPage;
