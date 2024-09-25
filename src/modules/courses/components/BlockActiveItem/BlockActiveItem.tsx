import React from 'react';
import { DotsSixVertical } from '@phosphor-icons/react';
import styles from './BlockActiveItem.module.scss';

type Props = {
  item: any,
}

const BlockActiveItem: React.FC<Props> = ({ item }) => {
  return (
    <div
      className={styles.Task}
    >
      <div className={styles.ItemWrapper}>
        <div
          className={styles.DragIconWrapper}
        >
          <DotsSixVertical size={32} className={styles.DragIcon}/>
        </div>
        
        <div className={styles.Content}>
          <p>{item.data.text}</p>
        </div>
      </div>
    </div>
  );
};

export default BlockActiveItem;
