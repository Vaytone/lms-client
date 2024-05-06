import React from 'react';
import { AvatarFillerProps } from '@components/ui/AvatarFillter/types';
import styles from './AvatarFiller.module.scss';

const AvatarFiller: React.FC<AvatarFillerProps> = ({ text, fontSize }) => {
  return (
    <div className={styles.AvatarFillerWrapper} style={{ fontSize: fontSize || 'inherit' }}>
      {text ? text.slice(0, 1) : 'V'}
    </div>
  );
};

export default AvatarFiller;
