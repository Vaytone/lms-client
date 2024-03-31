import React, { useEffect } from 'react';
import { useAppDispatch } from '@shared/hooks/redux';
import { setCurrentPage } from '@shared/redux/core/slice';
import { PageEnum } from '@type/page.types';

const DashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(setCurrentPage(PageEnum.Dashboard));
  }, []);
  
  return (
    <div>
      <p>Dashobard</p>
    </div>
  );
};

export default DashboardPage;
