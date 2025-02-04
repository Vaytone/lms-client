import React from 'react';
import CourseBuilderControls from '@modules/courses/components/CourseBuilderControls/CourseBuilderControls';
import CourseBaseForm from '@modules/courses/components/CourseBaseForm/CourseBaseForm';
import { useTranslation } from 'react-i18next';
import CourseBuilderForm from '@modules/courses/components/CourseBuilderForm/CourseBuilderForm';
import styles from './BuilderTemplate.module.scss';

const BuilderTemplate: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className={styles.PageHolder}>
      <CourseBuilderControls/>
      <div className={styles.PageWrapper}>
        <div className={styles.Page}>
          <h2>{t('courses.newCourse')}</h2>
          <div className={styles.Content}>
            <CourseBaseForm/>
            <CourseBuilderForm/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderTemplate;
