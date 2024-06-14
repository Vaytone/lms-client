import React from 'react';
import styles from './CreateGroupModal.module.scss';

const CreateGroupModal: React.FC = () => {
  return (
    <div>
      <div className={styles.TitleWrapper}>
        <h3 className={styles.Title}>Create group</h3>
        <p className={styles.Description}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, natus.</p>
      </div>
      <div className={styles.Divider}/>
    </div>
  );
};

export default CreateGroupModal;
