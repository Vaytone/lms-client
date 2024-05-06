import React from 'react';
import Search from '@components/ui/Search/Search';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@shared/hooks/redux';
import styles from './ApplicationControls.module.scss';

const ApplicationControls: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  
  const handleSearch = (query: string) => {
    // dispatch(getApplicationsBySearch(query));
  };
  
  return (
    <div className={styles.Controls}>
      <div className={styles.ControlsSearchWrapper}>
        <Search
          onSearch={handleSearch}
          placeholder={t('applications.search')}
        />
      </div>
    </div>
  );
};

export default ApplicationControls;
