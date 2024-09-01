import React from 'react';
import { Group } from '@modules/groups/types/group.types';
import { DEFAULT_GROUP_COVER_HREF } from '@shared/constants/core';
import styles from './GroupHeader.module.scss';
import { useTranslation } from 'react-i18next';

type Props = {
  group: Group,
}

const GroupHeader: React.FC<Props> = ({ group }) => {
  const { t } = useTranslation();
  
  return (
    <div className={styles.Wrapper}>
      <img className={styles.CoverImage} src={DEFAULT_GROUP_COVER_HREF}/>
      <div className={styles.BottomHeader}>
        <div className={styles.InfoWrapper}>
          <div className={styles.GroupIconWrapper}>
            <span className="icon-group"/>
          </div>
          <div>
            <p className={styles.GroupName}>{group.name}</p>
            <span className={styles.GroupDescription}>{t('core.group')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupHeader;
