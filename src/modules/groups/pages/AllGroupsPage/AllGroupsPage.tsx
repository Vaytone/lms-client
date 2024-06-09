import React from 'react';
import AllGroupsControls from '../../components/AllGroupsControls/AllGroupsControls';
import styles from './AllGroupsPage.module.scss';

const AllGroupsPage: React.FC = () => {
  return (
    <div className={styles.Page}>
      <AllGroupsControls />
    </div>
  );
};

export default AllGroupsPage;
