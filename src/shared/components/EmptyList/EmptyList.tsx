import React from 'react';
import cn from 'classnames';
import styles from './EmptyList.module.scss';

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
