import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@shared/hooks/redux';
import { PageEnum } from '@type/page.types';
import { setCurrentPage } from '@shared/redux/core/slice';
import ApplicationControls from '@modules/applications/components/ApplicationControls/ApplicationControls';
import ApplicationList from '@modules/applications/components/ApplicationList/ApplicationList';
import { useTranslation } from 'react-i18next';
import { ROLES_OPTIONS, SORT_OPTIONS } from '@shared/constants/user';
import { ApplicationSortBy } from '@modules/applications/types/application.types';
import { useSearchParams } from 'react-router-dom';
import styles from './ApplicationsPage.module.scss';

const ApplicationsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isParamsLoaded, setIsParamsLoaded] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(setCurrentPage(PageEnum.Applications));
    const sortBy = searchParams.get('sortBy');
    const role = searchParams.get('role');
    const search = searchParams.get('query');
    const page = searchParams.get('page');
    const rolesValues = ROLES_OPTIONS.map((item) => item.value);
    const sortValues = SORT_OPTIONS.map((item) => item.value);

    if (!page || Number.isNaN(Number(page)) || Number(page) < 1) {
      setSearchParams((searchParams) => {
        searchParams.set('page', '1');
        return searchParams;
      });
    }
    
    if (!role || !rolesValues.includes(role)) {
      setSearchParams((searchParams) => {
        searchParams.set('role', 'all');
        return searchParams;
      });
    }
    
    if (search) {
      setSearchParams((searchParams) => {
        searchParams.set('query', search);
        return searchParams;
      });
    } else {
      setSearchParams((searchParams) => {
        searchParams.set('query', '');
        return searchParams;
      });
    }
    
    if (!sortBy || !sortValues.includes(sortBy as ApplicationSortBy)) {
      setSearchParams((searchParams) => {
        searchParams.set('sortBy', 'created_at');
        return searchParams;
      });
    }
    
    setIsParamsLoaded(true);
  }, []);

  return (
    <div className={styles.Page}>
      <ApplicationControls/>
      <div className={styles.PageWrapper}>
        <h2>{t('core.applications')}</h2>
        {isParamsLoaded && <ApplicationList/>}
      </div>
    </div>
  );
};

export default ApplicationsPage;
