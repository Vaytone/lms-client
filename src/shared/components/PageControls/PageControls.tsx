import React, { ReactNode } from 'react';
import styles from './PageControls.module.scss';

type Props = {
  children: ReactNode
}

const PageControls: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.Controls}>
      {children}
    </div>
  );
};

export default PageControls;
