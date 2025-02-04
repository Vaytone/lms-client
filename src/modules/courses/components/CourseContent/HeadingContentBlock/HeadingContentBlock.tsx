import React from 'react';
import { HeadingCourseItem } from '@modules/courses/types/builder.types';
import styles from './HeadingContentBlock.module.scss';

type Props = {
  item: HeadingCourseItem,
}

const HeadingContentBlock: React.FC<Props> = ({ item }) => {
  
  return (
    <div>
      <h2 className={styles.Heading}>{item.data.text}</h2>
    </div>
  );
};

export default HeadingContentBlock;
