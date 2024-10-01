import React from 'react';
import { useTranslation } from 'react-i18next';
import PreviewTemplate from '@modules/courses/components/PreviewTemplate/PreviewTemplate';
import styles from './CoursePreviewPage.module.scss';
import PreviewControls from '@modules/courses/components/PreviewControls/PreviewControls';

const CoursePreviewPage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className={styles.Page}>
      <PreviewControls/>
      <div className={styles.PageWrapper}>
        {/*{isParamsLoaded && <ApplicationList/>}*/}
        <PreviewTemplate/>
      </div>
    </div>
  );
};

export default CoursePreviewPage;
