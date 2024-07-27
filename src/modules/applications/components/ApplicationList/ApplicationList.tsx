import React, { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetApplicationsQuery } from '@modules/applications/redux/api';
import ApplicationItem from '@modules/applications/components/ApplicationItem/ApplicationItem';
import PaginationElem from '@components/ui/Pagination/Pagination';
import ApplicationSkeleton from '@modules/applications/components/ApplicationSkeleton/ApplicationSkeleton';
import styles from './ApplicationList.module.scss';
import EmptyList from '@components/EmptyList/EmptyList';
import { useTranslation } from 'react-i18next';

const ApplicationList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = useMemo(() => {
    return {
      role: searchParams.get('role'),
      sortBy: searchParams.get('sortBy'),
      query: searchParams.get('query'),
      page: searchParams.get('page'),
    };
  }, [searchParams]);
  const { data, isLoading, isFetching } = useGetApplicationsQuery({ ...queryParams });
  const { t } = useTranslation();
  
  const onPageChange = (event) => {
    window.scrollTo(0, 0);
    
    setSearchParams((searchParams) => {
      searchParams.set('page', (event.selected + 1).toString());
      return searchParams;
    });
  };
  
  useEffect(() => {
    if (data && data?.page !== queryParams.page) {
      setSearchParams((searchParams) => {
        searchParams.set('page', data.page);
        return searchParams;
      });
    }
  }, [data]);
  
  return (
    <div className={styles.Wrapper}>
      {isFetching ? (
        <ApplicationSkeleton count={17}/>
      ) : (
        <div className={styles.ListHolder}>
          <div className={styles.List}>
            {data?.data?.map((item) => {
              return (
                <ApplicationItem key={item.id} application={item}/>
              );
            })}
          </div>
        </div>
      )}
      
      {isLoading || data?.pageCount < 2 ? null : (
        <div className={styles.PaginationWrapper}>
          <PaginationElem
            onPageChange={onPageChange}
            pageCount={data?.pageCount || 0}
            page={Number(data?.page) - 1}
          />
        </div>
      )}
      
      {!isLoading && !data?.data?.length && (
        <EmptyList text={t('applications.noApplications')}/>
      )}
    </div>
  
  );
};

export default ApplicationList;
