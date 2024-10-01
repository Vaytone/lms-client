import React from 'react';
import CourseBuilderControls from '@modules/courses/components/CourseBuilderControls/CourseBuilderControls';
import CourseBuilder from '@modules/courses/components/CourseBuilder/CourseBuilder';
import CourseBaseForm from '@modules/courses/components/CourseBaseForm/CourseBaseForm';
import { useTranslation } from 'react-i18next';
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
            <CourseBuilder/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderTemplate;
