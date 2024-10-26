import React, { useState } from 'react';
import { useAppDispatch } from '@shared/hooks/redux';
import styles from './DashboardPage.module.scss';

const DashboardPage: React.FC = () => {
  
  return (
    <div style={{flexGrow: 1}}>
      <p className={styles.Button}>Dashobard</p>
    </div>
  );
};

export default DashboardPage;
