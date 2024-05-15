import React, { Dispatch, SetStateAction, useEffect } from 'react';
import Search from '@components/ui/Search/Search';
import { useTranslation } from 'react-i18next';
import ControlsDropdown from '@components/ui/ControlsDropdown/ControlsDropdown';
import { RoleEnum } from '@type/role.types';
import { useSearchParams } from 'react-router-dom';
import { ApplicationSortBy } from '@modules/applications/types/application.types';
import styles from './ApplicationControls.module.scss';
import FiltersButton from '@components/ui/FiltersButton/FiltersButton';

type Props = {
  setIsParamsLoaded: Dispatch<SetStateAction<boolean>>
}

const ApplicationControls: React.FC<Props> = ({ setIsParamsLoaded }) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const ROLES_OPTIONS = [{ value: RoleEnum.Admin, label: t('core.admin') }, { value: RoleEnum.Student, label: t('core.student') }, { value: RoleEnum.Watcher, label: t('core.watcher') }, { value: 'all', label: t('core.allRoles') }];
  const SORT_OPTIONS = [{ value: 'full_name', label: t('applications.name') }, { value: 'email', label: t('applications.email') }, { value: 'created_at', label: t('applications.date') }];
  
  useEffect(() => {
    const sortBy = searchParams.get('sortBy');
    const role = searchParams.get('role');
    const search = searchParams.get('query');
    const rolesValues = ROLES_OPTIONS.map((item) => item.value);
    const sortValues = SORT_OPTIONS.map((item) => item.value);
    
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
    }
    
    if (!sortBy || !sortValues.includes(sortBy as ApplicationSortBy)) {
      setSearchParams((searchParams) => {
        searchParams.set('sortBy', 'created_at');
        return searchParams;
      });
    }
    
    setIsParamsLoaded(true);
  }, []);
  
  const handleChange = (name: string, value: string) => {
    setSearchParams((searchParams) => {
      searchParams.set(name, value);
      return searchParams;
    });
  };
  
  const handleSearch = (value: string) => {
    setSearchParams((searchParams) => {
      searchParams.set('query', value);
      return searchParams;
    });
  };
  
  return (
    <div className={styles.Controls}>
      <div className={styles.ControlsSearchWrapper}>
        <Search
          onSearch={handleSearch}
          placeholder={t('applications.search')}
          initialValue={searchParams.get('query')}
        />
      </div>
      <div className={styles.ControlsFiltersButton}>
        <FiltersButton onClick={() => null}/>
      </div>
      <div className={styles.Dropdowns}>
        <div className={styles.RoleDropdown}>
          <ControlsDropdown
            icon='icon-roles'
            preTitle={t('applications.roleSortPreTitle')}
            options={ROLES_OPTIONS}
            value={searchParams.get('role')}
            onChange={(val) => handleChange('role', val)}
          />
        </div>
        <div className={styles.SortDropdown}>
          <ControlsDropdown
            icon='icon-sort'
            placeholder='Sort'
            preTitle={`${t('core.sortBy')}`}
            options={SORT_OPTIONS}
            value={searchParams.get('sortBy')}
            onChange={(val) => handleChange('sortBy', val)}
          />
        </div>
      </div>
    
    </div>
  );
};

export default ApplicationControls;
