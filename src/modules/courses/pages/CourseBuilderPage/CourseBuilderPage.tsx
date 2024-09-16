import React from 'react';
import BuilderTemplate from '@modules/courses/components/BuilderTemplate/BuilderTemplate';
import styles from './CourseBuilderPage.module.scss';

const CourseBuilderPage = () => {
  return (
    <div className={styles.Page}>
      <BuilderTemplate/>
    </div>
  );
};
export default CourseBuilderPage;
