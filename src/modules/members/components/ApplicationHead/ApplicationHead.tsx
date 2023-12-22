import React from 'react';
import SmallCheckbox from '@components/ui/SmallCheckbox/SmallCheckbox';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux';
import { selectAllApplications } from '@modules/members/redux/applications/slice';
import styles from './ApplicationHead.module.scss';
import { useTranslation } from 'react-i18next';

const ApplicationHead: React.FC = () => {
  const isAllSelected = useAppSelector((state) => state.applications.selected.length === state.applications.data.length);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  
  const handleSelectAll = () => {
    dispatch(selectAllApplications());
  };
  
  return (
    <thead className={styles.TableHead}>
      <tr>
        <th aria-label='checkbox col'>
          <SmallCheckbox checked={isAllSelected} onChange={handleSelectAll}/>
        </th>
        <th>#</th>
        <th>{t('core.name')}</th>
        <th>{t('core.lastName')}</th>
        <th>{t('core.login')}</th>
        <th>{t('core.role')}</th>
        <th>{t('members.applicationDate')}</th>
        <th>{t('core.actions')}</th>
      </tr>
    </thead>
  );
};

export default ApplicationHead;
