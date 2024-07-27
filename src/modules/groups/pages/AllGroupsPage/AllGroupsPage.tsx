import React, { useState } from 'react';
import SideModal from '@components/SideModal/SideModal';
import CreateGroupModal from '@modules/groups/components/CreateGroupModal/CreateGroupModal';
import AllGroupsControls from '../../components/AllGroupsControls/AllGroupsControls';
import styles from './AllGroupsPage.module.scss';

const AllGroupsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <div className={styles.Page}>
      <AllGroupsControls openModal={handleOpenModal}/>
      {isModalOpen && (
        <SideModal
          closeFunc={handleCloseModal}
          outsideHandler={handleCloseModal}
          withCloseIcon
        >
          <CreateGroupModal/>
        </SideModal>
      )}
    </div>
  );
};

export default AllGroupsPage;
