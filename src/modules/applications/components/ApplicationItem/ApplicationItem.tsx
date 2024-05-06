import React from 'react';
import { format } from 'date-fns';
import { BASE_IMG_URI } from '@shared/constants/core';
import { useTranslation } from 'react-i18next';
import Button from '@components/ui/Button/Button';
import Avatar from 'react-avatar';
import { UserApplication } from '@modules/applications/types/application.types';
import styles from './ApplicationItem.module.scss';

type Props = {
  application: UserApplication;
}

const ApplicationItem: React.FC<Props> = ({ application }) => {
  const { t } = useTranslation();
  
  return (
    <section className={styles.Application}>
      <span className={styles.ApplicationDate}>{format(new Date(application.created_at), 'hh:mm dd.MM.yyyy')}</span>
      <span className={styles.ApplicationRole}>{`[${t(`core.${application.role}`)}]`}</span>
      <div className={styles.ApplicationAvatar}>
        {application.avatar
          ? <img className={styles.UserAvatar} src={`${BASE_IMG_URI}/${application?.avatar}`} alt={`${application.first_name} ${application.last_name} avatar`}/>
          : (
            <Avatar
              round
              size="100%"
              name={application.first_name}
              color={'#ababab'}
            />
          )}
      </div>
      <div className={styles.ApplicationContent}>
        <h5 className={styles.ApplicationName}>
          {`${application.first_name} ${application.last_name}`}
          {/*<strong>{` [${t(`core.${application.role}`)}]`}</strong>*/}
        </h5>
        <p className={styles.ApplicationLogin}>{`@${application.login}`}</p>
        <div className={styles.ApplicationButtons}>
          <Button text={t('applications.accept')}/>
          <Button
            text={t('applications.reject')}
            styleType='transparent'
          />
        </div>
      </div>
    </section>
  );
};

export default ApplicationItem;
