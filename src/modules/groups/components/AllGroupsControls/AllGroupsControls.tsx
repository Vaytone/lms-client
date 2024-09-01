import React from 'react';
import Search from '@components/ui/Search/Search';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '@components/ui/Button/Button';
import PageControls from '@components/PageControls/PageControls';
import styles from './AllGroupsControls.module.scss';

type Props = {
  openModal: () => void,
}

const AllGroupsControls: React.FC<Props> = ({ openModal }) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const handleSearch = (value: string) => {
    setSearchParams((searchParams) => {
      searchParams.set('query', value);
      return searchParams;
    });
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
      <div className={styles.ControlButton}>
        <Button
          icon="icon-plus-big"
          text={t('groups.createGroup')}
          onClick={openModal}
        />
      </div>
    </PageControls>
  );
};

export default AllGroupsControls;
