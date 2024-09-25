import React from 'react';
import CourseBuilderControls from '@modules/courses/components/CourseBuilderControls/CourseBuilderControls';
import CourseBuilder from '@modules/courses/components/CourseBuilder/CourseBuilder';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CourseForm } from '@modules/courses/types/builder.types';
import { courseBaseSchema } from '@modules/courses/validation/course.validation';
import CourseBaseForm from '@modules/courses/components/CourseBaseForm/CourseBaseForm';
import { useTranslation } from 'react-i18next';
import styles from './BuilderTemplate.module.scss';
import { BuilderContextProvider } from '@modules/courses/contexts/BuilderContext';

const BuilderTemplate: React.FC = () => {
  const { t } = useTranslation();
  
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<CourseForm>({
    mode: 'all',
    defaultValues: {
      title: '',
      description: '',
    },
    resolver: yupResolver(courseBaseSchema),
  });
  
  return (
    <div className={styles.PageHolder}>
      <BuilderContextProvider>
        <CourseBuilderControls/>
        <div className={styles.PageWrapper}>
          <div className={styles.Page}>
            <h2>{t('courses.newCourse')}</h2>
            <div className={styles.Content}>
              <CourseBaseForm control={control} errors={errors}/>
              <CourseBuilder/>
            </div>
          </div>
        </div>
      </BuilderContextProvider>
    </div>
  );
};

export default BuilderTemplate;
