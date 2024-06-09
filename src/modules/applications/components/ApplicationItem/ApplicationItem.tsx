import React, { memo, useCallback } from 'react';
import { ApplicationItemProps } from '@modules/applications/components/ApplicationItem/types';
import { BASE_IMG_URI, STATIC_HREF } from '@shared/constants/core';
import { useTranslation } from 'react-i18next';
import { useAcceptApplicationMutation, useRejectApplicationMutation, useRevertApplicationMutation } from '@modules/applications/redux/api';
import { applicationsErrorManager } from '@modules/applications/helper/applicationsErrorManager';
import { useSearchParams } from 'react-router-dom';
import { UserStatus } from '@type/user.types';
import Button from '@components/ui/Button/Button';
import { getNotification } from '@shared/helper/notification';
import { format } from 'date-fns';
import styles from './ApplicationItem.module.scss';

const ApplicationItem: React.FC<ApplicationItemProps> = ({ application }) => {
  const { full_name, avatar, user_info, email, message, id, user_statuses, created_at } = application;
  const [acceptApplication, { isLoading: isAcceptLoading }] = useAcceptApplicationMutation();
  const [rejectApplication, { isLoading: isRejectLoading }] = useRejectApplicationMutation();
  const [revertApplication] = useRevertApplicationMutation();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  
  const handleAccept = useCallback(() => {
    const sortBy = searchParams.get('sortBy');
    const role = searchParams.get('role');
    const query = searchParams.get('query');
    const page = Number(searchParams.get('page'));
    acceptApplication({ id, query: { sortBy, role, query, page: page.toString() } })
      .unwrap()
      .then(() => {
        getNotification(t('applications.applicationWasAccepted', { name: full_name }));
      })
      .catch((e: any) => {
        applicationsErrorManager(e?.data?.message);
      });
  }, []);
  
  const handleReject = useCallback(() => {
    const sortBy = searchParams.get('sortBy');
    const role = searchParams.get('role');
    const query = searchParams.get('query');
    const page = Number(searchParams.get('page'));
    rejectApplication({ id, query: { sortBy, role, query, page: page.toString() } })
      .unwrap()
      .catch((e: any) => {
        applicationsErrorManager(e?.data?.message);
      });
  }, []);
  
  const handleRevert = useCallback(() => {
    const sortBy = searchParams.get('sortBy');
    const role = searchParams.get('role');
    const query = searchParams.get('query');
    const page = Number(searchParams.get('page'));
    revertApplication({ id, query: { sortBy, role, query, page: page.toString() } })
      .unwrap()
      .catch((e: any) => {
        applicationsErrorManager(e?.data?.message);
      });
  }, []);
  
  return (
    <article>
      <div className={styles.Wrapper}>
        <div className={styles.UserInfoWrapper}>
          <div className={styles.UserInfo}>
            {avatar
              ? <img className={styles.Avatar} src={`${BASE_IMG_URI}/${avatar}`} alt={`${full_name} avatar`}/>
              : <img className={styles.Avatar} src={`${STATIC_HREF}/defaultAvatar.svg`} alt="default avatar"/>}
            <div>
              <h6 className={styles.Name}>{full_name}</h6>
              <p className={styles.Email}>{email}</p>
            </div>
          </div>
          <p className={styles.Role}>{t(`core.${user_info.role}`)}</p>
        </div>
        <p className={styles.Message}>{message?.text ? message.text : t('applications.noMessage')}</p>
        <div className={styles.BottomInfo}>
          <div className={styles.Date}>
            <span className="icon-clock"/>
            <p>{format(new Date(created_at), 'dd/MM/yyyy HH:mm')}</p>
          </div>
          {user_statuses.status === UserStatus.Pending && (
            <div className={styles.Buttons}>
              <Button text={t('applications.reject')} styleType='transparent' onClick={handleReject} isLoading={isRejectLoading} disabled={isAcceptLoading || isRejectLoading}/>
              <Button text={t('applications.accept')} onClick={handleAccept} isLoading={isAcceptLoading} disabled={isAcceptLoading || isRejectLoading}/>
            </div>
          )}
          {user_statuses.status !== UserStatus.Pending && (
            <div className={styles.StatusChanged}>
              <p>{t(user_statuses.status === UserStatus.Active ? 'applications.applicationAccepted' : 'applications.applicationRejected')}</p>
              <p className={styles.StatusCancel} onClick={handleRevert}>{t('core.cancel')}</p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default memo(ApplicationItem);
