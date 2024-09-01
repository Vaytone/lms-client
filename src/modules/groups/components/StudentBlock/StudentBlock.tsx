import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Group } from '@modules/groups/types/group.types';
import { GroupRoleEnum } from '@type/role.types';
import { BASE_IMG_URI, DEFAULT_AVATAR_HREF } from '@shared/constants/core';
import Ellipsis from 'react-ellipsis-component';
import styles from './StudentBlock.module.scss';

type Props = {
  group: Group,
}

const StudentBlock: React.FC<Props> = ({ group }) => {
  const students = useMemo(() => {
    return group.users.filter((item) => item.role === GroupRoleEnum.Member);
  }, [group]);
  const { t } = useTranslation();
  
  return (
    students.length ? (
      <div className={styles.Wrapper}>
        <div className={styles.Header}>
          <p className={styles.Title}>
            {`${t('core.students')} `}
          
            <span
              className={styles.Counter}
            >
              {students.length}
            </span>
          </p>
        </div>
        <div className={styles.List}>
          {students.slice(0, 6).map((item) => {
            return (
              <div className={styles.Item} key={item.user.id}>
                {item.user.avatar
                  ? (
                    <img
                      className={styles.MemberAvatar}
                      src={`${BASE_IMG_URI}/${item.user.avatar}`}
                      alt={`${item.user.full_name} avatar`}
                    />
                  )
                  : <img className={styles.MemberAvatar} src={DEFAULT_AVATAR_HREF} alt="default avatar"/>}
                <Ellipsis
                  text={item.user.first_name}
                  ellipsis
                  maxLine={1}
                  className={styles.MemberName}
                />
              </div>
            );
          })}
        </div>
      </div>
    ) : null
  );
};

export default StudentBlock;
