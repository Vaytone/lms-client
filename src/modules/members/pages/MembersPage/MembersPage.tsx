import React, { useEffect } from 'react';
import { useAppDispatch } from '@shared/hooks/redux';
import { setCurrentPage } from '@shared/redux/core/slice';
import { PageEnum } from '@type/page.types';
import styles from './MembersPage.module.scss';

const MembersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(setCurrentPage(PageEnum.Members));
  }, []);
  
  return (
    <div>
      <p>applications</p>
    </div>
  );
};

export default MembersPage;
