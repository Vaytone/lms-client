import React, { useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import SideModal from '@components/SideModal/SideModal';
import AddStudentModal from '@modules/groups/components/AddStudentModal/AddStudentModal';
import { Group } from '@modules/groups/types/group.types';
import styles from './GroupControls.module.scss';

type Props = {
  group: Group,
}

const GroupControls: React.FC<Props> = ({ group }) => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const { t } = useTranslation();
  
  const handleOpenAddModal = () => {
    setAddModalOpen(true);
  };
  
  const handleCloseAddModal = () => {
    setAddModalOpen(false);
  };
  
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Item} onClick={handleOpenAddModal}>
        <span className={cn(styles.Icon, 'icon-add-user')}/>
        <p className={styles.Text}>{t('groups.addStudent')}</p>
      </div>
      <div className={styles.Item}>
        <span className={cn(styles.Icon, 'icon-mentor')}/>
        <p className={styles.Text}>{t('groups.changeMentor')}</p>
      </div>
      
      {isAddModalOpen && (
        <SideModal
          closeFunc={handleCloseAddModal}
          outsideHandler={handleCloseAddModal}
          withCloseIcon
        >
          <AddStudentModal closeFunc={handleCloseAddModal} groupId={group.id}/>
        </SideModal>
      )}
    </div>
  );
};

export default GroupControls;
