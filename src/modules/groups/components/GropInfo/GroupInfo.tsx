import React, { useMemo } from 'react';
import { Group } from '@modules/groups/types/group.types';
import styles from './GroupInfo.module.scss';
import cn from 'classnames';
import { GroupRoleEnum } from '@type/role.types';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { useAppSelector } from '@shared/hooks/redux';
import { enUS, uk } from 'date-fns/locale';

type Props = {
  group: Group,
}

const localeObj = {
  en: enUS,
  uk,
};

const GroupInfo: React.FC<Props> = ({ group }) => {
  const locale = useAppSelector((state) => state.core.lng);
  const mentor = useMemo(() => {
    return group.users.find((item) => item.role === GroupRoleEnum.Admin);
  }, []);
  const { t } = useTranslation();
  
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Header}>
        <p className={styles.Title}>{t('groups.information')}</p>
      </div>
      
      <div className={styles.Content}>
        <div className={styles.InfoItem}>
          <span className={cn(styles.InfoIcon, 'icon-mentor')}/>
          <p className={styles.InfoValue}>{mentor ? mentor.user.full_name : t('groups.noMentor')}</p>
        </div>
        <div className={styles.InfoItem}>
          <span className={cn(styles.InfoIcon, 'icon-clock')}/>
          <p className={styles.InfoValue}>{format(new Date(group.created_at), 'dd MMMM, yyyy', { locale: localeObj[locale] })}</p>
        </div>
      </div>
    </div>
  );
};

export default GroupInfo;
