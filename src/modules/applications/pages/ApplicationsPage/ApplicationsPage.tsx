import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@shared/hooks/redux';
import { PageEnum } from '@type/page.types';
import { setCurrentPage } from '@shared/redux/core/slice';
import ApplicationControls from '@modules/applications/components/ApplicationControls/ApplicationControls';
import ApplicationList from '@modules/applications/components/ApplicationList/ApplicationList';
import { useTranslation } from 'react-i18next';
import styles from './ApplicationsPage.module.scss';

const ApplicationsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isParamsLoaded, setIsParamsLoaded] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(setCurrentPage(PageEnum.Applications));
  }, []);

  return (
    <div>
      <ApplicationControls
        setIsParamsLoaded={setIsParamsLoaded}
      />
      <div className={styles.PageWrapper}>
        <h2>{t('core.applications')}</h2>
        {isParamsLoaded && <ApplicationList/>}
      </div>
    </div>
  );
};

export default ApplicationsPage;
