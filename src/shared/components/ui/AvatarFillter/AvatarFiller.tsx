import React from 'react';
import { AvatarFillerProps } from '@components/ui/AvatarFillter/types';
import styles from './AvatarFiller.module.scss';

const AvatarFiller: React.FC<AvatarFillerProps> = ({ text }) => {
  return (
    <div className={styles.AvatarFillerWrapper}>
      {text ? text.slice(0, 1) : 'V'}
    </div>
  );
};

export default AvatarFiller;
