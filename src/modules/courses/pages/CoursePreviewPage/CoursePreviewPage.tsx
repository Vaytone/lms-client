import React from 'react';
import PreviewTemplate from '@modules/courses/components/PreviewTemplate/PreviewTemplate';
import PreviewControls from '@modules/courses/components/PreviewControls/PreviewControls';
import styles from './CoursePreviewPage.module.scss';

const CoursePreviewPage: React.FC = () => {

  return (
    <div className={styles.Page}>
      <PreviewControls/>
      <div className={styles.PageWrapper}>
        <PreviewTemplate/>
      </div>
    </div>
  );
};

export default CoursePreviewPage;
