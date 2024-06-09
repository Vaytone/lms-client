import React, { useState } from 'react';
import Search from '@components/ui/Search/Search';
import { useTranslation } from 'react-i18next';
import ControlsDropdown from '@components/ui/ControlsDropdown/ControlsDropdown';
import { useSearchParams } from 'react-router-dom';
import FiltersButton from '@components/ui/FiltersButton/FiltersButton';
import { ROLES_OPTIONS, SORT_OPTIONS } from '@shared/constants/user';
import cn from 'classnames';
import Button from '@components/ui/Button/Button';
import styles from './ApplicationControls.module.scss';
import PageControls from '@components/PageControls/PageControls';

const ApplicationControls: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  
  const handleChange = (name: string, value: string) => {
    setSearchParams((searchParams) => {
      searchParams.set(name, value);
      searchParams.set('page', '1');
      return searchParams;
    });
  };
  
  const handleSearch = (value: string) => {
    setSearchParams((searchParams) => {
      searchParams.set('query', value);
      searchParams.set('page', '1');
      return searchParams;
    });
  };
  
  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };
  
  return (
    <PageControls>
      <div className={styles.ControlsSearchWrapper}>
        <Search
          onSearch={handleSearch}
          placeholder={t('applications.search')}
          initialValue={searchParams.get('query')}
        />
      </div>
      <div className={styles.ControlsFiltersButton}>
        <FiltersButton onClick={toggleModal}/>
      </div>
      <div className={cn([styles.ControlsModal, isOpen && styles.ControlsModalActive])}>
        <div className={styles.ModalContent}>
          <h2 className={styles.ModalTitle}>{t('core.filters')}</h2>
          <div className={styles.ModalDropdowns}>
            <div className={styles.RoleDropdown}>
              <ControlsDropdown
                icon="icon-roles"
                preTitle={t('applications.roleSortPreTitle')}
                options={ROLES_OPTIONS}
                value={searchParams.get('role')}
                onChange={(val) => handleChange('role', val)}
              />
            </div>
            <div className={styles.SortDropdown}>
              <ControlsDropdown
                icon="icon-sort"
                placeholder="Sort"
                preTitle={`${t('core.sortBy')}`}
                options={SORT_OPTIONS}
                value={searchParams.get('sortBy')}
                onChange={(val) => handleChange('sortBy', val)}
              />
            </div>
          </div>
          <Button text={t('core.close')} onClick={toggleModal}/>
        </div>
      </div>
      <div className={styles.Dropdowns}>
        <div className={styles.RoleDropdown}>
          <ControlsDropdown
            icon="icon-roles"
            preTitle={t('applications.roleSortPreTitle')}
            options={ROLES_OPTIONS}
            value={searchParams.get('role')}
            onChange={(val) => handleChange('role', val)}
          />
        </div>
        <div className={styles.SortDropdown}>
          <ControlsDropdown
            icon="icon-sort"
            placeholder="Sort"
            preTitle={`${t('core.sortBy')}`}
            options={SORT_OPTIONS}
            value={searchParams.get('sortBy')}
            onChange={(val) => handleChange('sortBy', val)}
          />
        </div>
      </div>
    
    </PageControls>
  );
};

export default ApplicationControls;
