import React, { Fragment, useId, useMemo } from 'react';
import { BASE_IMG_URI, DEFAULT_AVATAR_HREF } from '@shared/constants/core';
import { Tooltip } from 'react-tooltip';
import { UserGroup } from '@modules/groups/types/group.types';
import styles from './StudentList.module.scss';

type Props = {
  users: UserGroup[],
}

const StudentList: React.FC<Props> = ({ users }) => {
  const shouldSliced = useMemo(() => users.length > 3, [users]);
  const id = useId();
  
  // {avatar
  //   ? <img className={styles.Avatar} src={`${BASE_IMG_URI}/${avatar}`} alt={`${full_name} avatar`}/>
  //   : <img className={styles.Avatar} src={DEFAULT_AVATAR_HREF} alt="default avatar"/>}
  
  return (
    <div className={styles.MembersWrapper}>
      {users.slice(0, shouldSliced ? 2 : 3).map((item) => {
        return (
          <Fragment key={`${item.user.id}-user-list-${id}`}>
            {item.user.avatar
              ? <img className={styles.MemberAvatar} src={`${BASE_IMG_URI}/${item.user.avatar}`} alt={`${item.user.full_name} avatar`} data-tooltip-id={`${item.user.id}-participant`}/>
              : <img className={styles.MemberAvatar} src={DEFAULT_AVATAR_HREF} alt="default avatar" data-tooltip-id={`${item.user.id}-participant`}/>}
            <Tooltip
              style={{ zIndex: 7 }}
              id={`${item.user.id}-participant`}
              place="bottom"
              content={item.user.full_name}
            />
          </Fragment>
        );
      })}
      {shouldSliced && (
        <div
          data-tooltip-id={`${id}-membersMore`}
          className={styles.MemberFiller}
        >
          {`+${users.length - 2}`}
        </div>
      )}
    </div>
  );
};

export default StudentList;
