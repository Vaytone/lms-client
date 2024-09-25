import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { CourseForm } from '@modules/courses/types/builder.types';
import Input from '@components/ui/Input/Input';
import { useTranslation } from 'react-i18next';
import TextArea from '@components/ui/TextArea/Input';
import InfoBlock from '@components/ui/InfoBlock/InfoBlock';
import styles from './CourseBaseForm.module.scss';
import Modal from '@components/Modal/Modal';
import DeleteBlockModal from '@modules/courses/components/DeleteBlockModal/DeleteBlockModal';

type Props = {
  control: Control<CourseForm, any>,
  errors: FieldErrors<CourseForm>,
}

const CourseBaseForm: React.FC<Props> = ({ errors, control }) => {
  const { t } = useTranslation();
  
  return (
    <div className={styles.Wrapper}>
      <div className={styles.FormContent}>
        <h3>
          {t('courses.mainInfoTitle')}
        </h3>
        
        <InfoBlock text={t('courses.mainInfoBlock')}/>
        
        <div className={styles.Form}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={t('courses.courseTitle')}
                placeholder={t('courses.enterCourseTitle')}
                isInvalid={Boolean(errors.title)}
                error={errors?.title?.message}
              />
            )}
          />
          
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextArea
                {...field}
                label={t('courses.courseDescription')}
                placeholder={t('courses.enterCourseDescription')}
                isInvalid={Boolean(errors.description)}
                error={errors?.description?.message}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseBaseForm;
