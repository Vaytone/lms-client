import React from 'react';
import { Info } from '@phosphor-icons/react';
import styles from './InfoBlock.module.scss';

type Props = {
  text: string;
}

const InfoBlock: React.FC<Props> = ({ text }) => {
  return (
    <div className={styles.InfoBlock}>
      <div className={styles.IconWrapper}>
        <Info size={32}/>
      </div>
      <p>{text}</p>
    </div>
  );
};

export default InfoBlock;
