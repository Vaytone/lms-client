import React, { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetGroupsQuery } from '@modules/groups/redux/api';
import EmptyList from '@components/EmptyList/EmptyList';
import GroupItem from '@modules/groups/components/GroupItem/GroupItem';
import { Group } from '@modules/groups/types/group.types';
import styles from './GroupsList.module.scss';

const GroupsList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = useMemo(() => {
    return {
      query: searchParams.get('query'),
      page: searchParams.get('page'),
    };
  }, [searchParams]);
  const { data, isLoading, isFetching } = useGetGroupsQuery({ ...queryParams });
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
        // <ApplicationSkeleton count={17}/>
        <div/>
      ) : (
        <div className={styles.ListHolder}>
          <div className={styles.List}>
            {data?.data?.map((item: Group) => <GroupItem group={item} key={item.id} />)}
          </div>
        </div>
      )}
      
      {!isLoading && !data?.data?.length && (
        <EmptyList text={t('groups.noGroups')}/>
      )}
      
    </div>
  );
};

export default GroupsList;
