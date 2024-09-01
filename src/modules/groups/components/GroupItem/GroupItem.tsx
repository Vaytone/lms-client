import React, { useMemo } from 'react';
import { Group } from '@modules/groups/types/group.types';
import { useTranslation } from 'react-i18next';
import StudentList from '@modules/groups/components/StudentList/StudentList';
import { GroupRoleEnum } from '@type/role.types';
import { BASE_IMG_URI, DEFAULT_AVATAR_HREF, STATIC_HREF } from '@shared/constants/core';
import Ellipsis from 'react-ellipsis-component';
import Button from '@components/ui/Button/Button';
import { NavLink } from 'react-router-dom';
import { AppRoutes } from '@shared/constants/routes';
import styles from './GroupItem.module.scss';

type Props = {
  group: Group,
}

const GroupItem: React.FC<Props> = ({ group }) => {
  const { t } = useTranslation();
  
  return (
    <NavLink to={`${AppRoutes.AllGroups}/${group.id}`} className={styles.Wrapper}>
      <div className={styles.Holder}>
        <div className={styles.InfoWrapper}>
          <div className={styles.GroupIconWrapper}>
            <span className="icon-avatar"/>
          </div>
          <div className={styles.MainInfo}>
            <Ellipsis
              text={group.name}
              ellipsis
              maxLine={1}
              className={styles.Title}
            />
          </div>
          <p className={styles.MemberText}>
            <span className="icon-group"/>
            <span className={styles.MemberCounter}>{`${group.users.length}`}</span>
          </p>
        </div>
        <div className={styles.Divider}/>
        <div className={styles.BottomWrapper}>
          <div className={styles.GroupInfo}>
            <p className={styles.GroupInfoTitle}>Учні:</p>
            {group.users.filter((item) => item.role === GroupRoleEnum.Member).length
              ? <StudentList users={group.users.filter((item) => item.role === GroupRoleEnum.Member)}/>
              : <p className={styles.NoUser}>{t('groups.noStudents')}</p>}
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default GroupItem;
