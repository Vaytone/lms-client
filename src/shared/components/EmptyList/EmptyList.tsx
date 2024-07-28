import React from 'react';
import styles from './EmptyList.module.scss';
import cn from 'classnames';

type Props = {
  text: string
}

const EmptyList: React.FC<Props> = ({ text }) => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.IconWrapper}>
        <span className={cn('icon-cross', styles.Icon)}/>
      </div>
      <p className={styles.Text}>{text}</p>
    </div>
  );
};

export default EmptyList;
