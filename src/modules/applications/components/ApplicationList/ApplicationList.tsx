import React from 'react';
import { useGetApplicationsQuery } from '@modules/applications/redux/api';
import ApplicationItem from '../ApplicationItem/ApplicationItem';
import styles from './ApplicationList.module.scss';

const ApplicationList: React.FC = () => {
  const { data, isLoading, error } = useGetApplicationsQuery();
  
  return (
    <div className={styles.List}>
      {data?.map((item) => <ApplicationItem key={item.id} application={item} />)}
    </div>
  );
};

export default ApplicationList;
