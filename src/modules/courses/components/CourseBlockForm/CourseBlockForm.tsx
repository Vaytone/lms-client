import React from 'react';
import CourseBuilderItem from '@modules/courses/components/CourseBuilderItem/CourseBuilderItem';
import styles from './CourseBlockForm.module.scss';

type Props = {
  items: string[]
};

const CourseBlockForm: React.FC<Props> = ({ items }) => {
  return (
    <div className={styles.Block}>
      {items.map((item) => (
        <CourseBuilderItem key={item} id={item}/>
      ))}
    </div>
  );
};

export default CourseBlockForm;
