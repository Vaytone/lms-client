import React, { useEffect, useState } from 'react';
import SideModal from '@components/SideModal/SideModal';
import CreateGroupModal from '@modules/groups/components/CreateGroupModal/CreateGroupModal';
import { useTranslation } from 'react-i18next';
import { setCurrentPage } from '@shared/redux/core/slice';
import { PageEnum } from '@type/page.types';
import { useAppDispatch } from '@shared/hooks/redux';
import { useSearchParams } from 'react-router-dom';
import GroupsList from '@modules/groups/components/GroupsList/GroupsList';
import styles from './AllGroupsPage.module.scss';
import AllGroupsControls from '../../components/AllGroupsControls/AllGroupsControls';

const AllGroupsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isParamsLoaded, setIsParamsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  
  useEffect(() => {
    dispatch(setCurrentPage(PageEnum.Groups));
    const search = searchParams.get('query');
    const page = searchParams.get('page');
    
    if (!page || Number.isNaN(Number(page)) || Number(page) < 1) {
      setSearchParams((searchParams) => {
        searchParams.set('page', '1');
        return searchParams;
      });
    }
    
    if (search) {
      setSearchParams((searchParams) => {
        searchParams.set('query', search);
        return searchParams;
      });
    } else {
      setSearchParams((searchParams) => {
        searchParams.set('query', '');
        return searchParams;
      });
    }
    
    setIsParamsLoaded(true);
  }, []);
  
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
          <CreateGroupModal closeFunc={handleCloseModal}/>
        </SideModal>
      )}
      <div className={styles.PageWrapper}>
        <h2>{t('core.groups')}</h2>
        
        <div className={styles.PageContent}>
          {isParamsLoaded && <GroupsList/>}
        </div>
      </div>
    </div>
  );
};

export default AllGroupsPage;
