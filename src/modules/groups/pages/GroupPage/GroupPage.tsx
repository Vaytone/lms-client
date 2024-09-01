import React, { useMemo } from 'react';
import GroupHeader from '@modules/groups/components/GroupHeader/GroupHeader';
import { useGetGroupQuery } from '@modules/groups/redux/api';
import { useParams } from 'react-router-dom';
import GroupInfo from '@modules/groups/components/GropInfo/GroupInfo';
import StudentBlock from '@modules/groups/components/StudentBlock/StudentBlock';
import { useAppSelector } from '@shared/hooks/redux';
import { GroupRoleEnum, RoleEnum } from '@type/role.types';
import GroupControls from '@modules/groups/components/GroupControls/GroupControls';
import styles from './GroupPage.module.scss';

const GroupPage: React.FC = () => {
  const params = useParams();
  const user = useAppSelector((state) => state.auth.user);
  const { data, isLoading } = useGetGroupQuery({ groupId: params.groupId });
  const userIsAdmin = useMemo(() => {
    if (data) {
      const userInGroup = data.users.find((item) => item.user.id === user.id);
      
      return userInGroup?.role === GroupRoleEnum.Admin || user.role === RoleEnum.Owner;
    }
    
    return false;
  }, [data]);
  
  return (
    <div className={styles.Page}>
      <div className={styles.PageWrapper}>
        {data ? (
          <>
            <GroupHeader group={data}/>
            <div className={styles.Content}>
              <div className={styles.Main}>
                <GroupInfo group={data}/>
              </div>
              <div className={styles.Aside}>
                {userIsAdmin ? <GroupControls group={data}/> : null}
                
                <StudentBlock group={data}/>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default GroupPage;
