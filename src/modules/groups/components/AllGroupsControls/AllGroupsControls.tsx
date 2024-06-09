import React from 'react';
import Search from '@components/ui/Search/Search';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '@components/ui/Button/Button';
import { AppRoutes } from '@shared/constants/routes';
import styles from './AllGroupsControls.module.scss';
import PageControls from '@components/PageControls/PageControls';

const AllGroupsControls: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const handleSearch = (value: string) => {
    setSearchParams((searchParams) => {
      searchParams.set('query', value);
      return searchParams;
    });
  };
  
  const handleNavigate = () => {
    navigate(AppRoutes.CreateGroup);
  };
  
  return (
    <PageControls>
      <div className={styles.ControlsSearchWrapper}>
        <Search
          onSearch={handleSearch}
          placeholder={t('groups.search')}
          initialValue={searchParams.get('query')}
        />
      </div>
      <div>
        <Button
          icon="icon-plus-big"
          text="Створити групу"
          onClick={handleNavigate}
        />
      </div>
    </PageControls>
  );
};

export default AllGroupsControls;
