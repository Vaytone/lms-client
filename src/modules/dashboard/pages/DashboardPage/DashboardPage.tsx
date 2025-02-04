import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@shared/hooks/redux';
import styles from './DashboardPage.module.scss';

const DashboardPage: React.FC = () => {
  const items = ['Элемент 1', 'Элемент 2', 'Элемент 3'];
  const itemList = [];
  
  useEffect(() => {
    const a = {
      c: 1,
      d: {
        b: 4,
        x: () => null,
      },
    };
    const b = Object.create(a);
    
    // b.c = 4;
    
    console.log(b);
  }, []);
  
  return (
    <div style={{ flexGrow: 1, color: 'white' }}>
      {/*<p className={styles.Button}>Dashobard</p>*/}
      {itemList}
    </div>
  );
};

export default DashboardPage;
