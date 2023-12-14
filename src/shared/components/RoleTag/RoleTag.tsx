import React from 'react';
import cn from 'classnames';
import { RoleTagProps } from '@components/RoleTag/types';
import { RoleEnum } from '@type/role.types';
import { useTranslation } from 'react-i18next';
import styles from './RoleTag.module.scss';

const RoleTag: React.FC<RoleTagProps> = ({ role }) => {
  const { t } = useTranslation();
  
  return (
    <div className={cn(
      styles.RoleTagWrapper,
      role === RoleEnum.Admin && styles.RoleTagWrapperAdmin,
      role === RoleEnum.Guest && styles.RoleTagWrapperGuest,
      role === RoleEnum.Owner && styles.RoleTagWrapperOwner,
      role === RoleEnum.Watcher && styles.RoleTagWrapperWatcher,
      role === RoleEnum.Student && styles.RoleTagWrapperStudent,
    )}
    >
      {t(`core.${role}`)}
    </div>
  );
};

export default RoleTag;
