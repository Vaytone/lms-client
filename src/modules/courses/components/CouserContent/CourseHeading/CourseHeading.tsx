import React from 'react';
import { TitleBlock } from '@modules/courses/types/builder.types';
import styles from './CourseHeading.module.scss';

type Props = {
  item: TitleBlock,
}

const CourseHeading: React.FC<Props> = ({ item }) => {
  return (
    <div>
      <h2 className={styles.Heading}>{item.data.text}</h2>
    </div>
  );
};

export default CourseHeading;
