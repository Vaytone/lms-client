import React, { useId } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './ApplicationSkeleton.module.scss';

type Props = {
  count: number;
}

const ApplicationSkeleton: React.FC<Props> = ({ count }) => {
  const id = useId();
  const array = [...Array(count).keys()];
  
  return (
    <div className={styles.List}>
      {array.map((item) => (
        <div className={styles.Wrapper} key={`${item}-${id}`}>
          <div className={styles.Role}>
            <Skeleton/>
          </div>
          <div className={styles.UserInfoWrapper}>
            <div className={styles.UserInfo}>
              <Skeleton className={styles.Avatar} circle/>
              <div className={styles.UserData}>
                <Skeleton className={styles.Name}/>
                <Skeleton className={styles.Email}/>
              </div>
            </div>
          </div>
          <div className={styles.Message}>
            <Skeleton count={2}/>
          </div>
          <div className={styles.BottomInfo}>
            <div className={styles.Date}>
              <span className="icon-clock"/>
              <Skeleton/>
            </div>
            <div className={styles.Buttons}>
              <Skeleton/>
              <Skeleton/>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApplicationSkeleton;
