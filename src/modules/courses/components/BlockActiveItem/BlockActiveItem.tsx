import React from 'react';
import styles from './BlockActiveItem.module.scss';

type Props = {
  item: any,
}

const BlockActiveItem: React.FC<Props> = ({ item }) => {
  return (
    <div
      className={styles.Task}
    >
      <p>{item.data.text}</p>
    </div>
  );
};

export default BlockActiveItem;
