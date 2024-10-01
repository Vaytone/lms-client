import React, { useContext } from 'react';
import { SubmitHandler } from 'react-hook-form';
import Input from '@components/ui/Input/Input';
import { useTranslation } from 'react-i18next';
import TextArea from '@components/ui/TextArea/Input';
import InfoBlock from '@components/ui/InfoBlock/InfoBlock';
import { BuilderContext } from '@modules/courses/contexts/BuilderContext';
import { SignInForm } from '@modules/auth/types/auth.types';
import styles from './CourseBaseForm.module.scss';

const CourseBaseForm: React.FC = () => {
  const { register, errors } = useContext(BuilderContext);
  const { t } = useTranslation();
  
  return (
    <div className={styles.Wrapper}>
      <div className={styles.FormContent}>
        <h3>
          {t('courses.mainInfoTitle')}
        </h3>
        
        <InfoBlock text={t('courses.mainInfoBlock')}/>
        
        <form className={styles.Form}>
          <Input
            {...register('title')}
            label={t('courses.courseTitle')}
            placeholder={t('courses.enterCourseTitle')}
            isInvalid={Boolean(errors.title)}
            error={errors?.title?.message}
          />
          
          <TextArea
            {...register('description')}
            label={t('courses.courseDescription')}
            placeholder={t('courses.enterCourseDescription')}
            isInvalid={Boolean(errors.description)}
            error={errors?.description?.message}
          />
        </form>
      </div>
    </div>
  );
};

export default CourseBaseForm;
