import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetApplicationsQuery } from '@modules/applications/redux/api';
import ApplicationItem from '@modules/applications/components/ApplicationItem/ApplicationItem';
import styles from './ApplicationList.module.scss';

const ApplicationList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const queryParams = useMemo(() => {
    return {
      role: searchParams.get('role'),
      sortBy: searchParams.get('sortBy'),
      query: searchParams.get('query'),
    };
  }, [searchParams]);
  const { data = [] } = useGetApplicationsQuery({ ...queryParams });
  
  return (
    <div className={styles.Wrapper}>
      {data.map((item) => {
        return (
          <ApplicationItem key={item.id} application={item}/>
        );
      })}
    </div>
  );
};

export default ApplicationList;
