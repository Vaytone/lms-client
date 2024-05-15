import React from 'react';
import cn from 'classnames';
import { FiltersButtonProps } from './types';
import styles from './FiltersButton.module.scss';

const FiltersButton: React.FC<FiltersButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.Wrapper} aria-label='filters button'>
      <span className={cn(['icon-filters', styles.Icon])}/>
    </button>
  );
};

export default FiltersButton;
