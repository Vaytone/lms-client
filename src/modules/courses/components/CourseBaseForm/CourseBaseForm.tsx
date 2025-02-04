import React, { ChangeEvent, useEffect, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@components/ui/Input/Input';
import { useTranslation } from 'react-i18next';
import TextArea from '@components/ui/TextArea/Input';
import InfoBlock from '@components/ui/InfoBlock/InfoBlock';
import { CourseForm } from '@modules/courses/types/builder.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux';
import { setMainInfo } from '@modules/courses/redux/slice';
import * as yup from 'yup';
import { t } from 'i18next';
import { COURSE_VALIDATION } from '@modules/courses/constants/validation';
import cn from 'classnames';
import styles from './CourseBaseForm.module.scss';

const courseBaseSchema = yup.object({
  title: yup.string()
    .required(t('errors.requiredFiled'))
    .min(COURSE_VALIDATION.minTitle, t('auth.minLength', { value: COURSE_VALIDATION.minTitle }))
    .max(COURSE_VALIDATION.maxTitle, t('auth.maxLength', { value: COURSE_VALIDATION.maxTitle })),
  description: yup.string()
    .required(t('errors.requiredFiled'))
    .min(COURSE_VALIDATION.minDescription, t('auth.minLength', { value: COURSE_VALIDATION.minDescription }))
    .max(COURSE_VALIDATION.maxDescription, t('auth.maxLength', { value: COURSE_VALIDATION.maxDescription })),
});

const CourseBaseForm: React.FC = () => {
  const values = useAppSelector((state) => state.courseBuilder.main);
  const validationTrigger = useAppSelector((state) => state.courseBuilder.validationTrigger);
  const {
    handleSubmit,
    register,
    setValue,
    trigger,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<CourseForm>({
    mode: 'all',
    defaultValues: {
      title: values.title || '',
      description: values.description || '',
    },
    resolver: yupResolver(courseBaseSchema),
  });
  const { t } = useTranslation();
  const isWithInitValuesObj = useMemo(() => ({
    title: Boolean(values.title.trim()),
    description: Boolean(values.description.trim()),
  }), []);
  const isValidationTriggered = useRef(false);
  const previousValidationTrigger = useRef(validationTrigger);
  const dispatch = useAppDispatch();
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(setMainInfo({
      key: e.target.name,
      value: e.target.value,
    }));
    setValue(e.target.name as keyof CourseForm, e.target.value, { shouldDirty: true });
    
    trigger();
  };
  
  useEffect(() => {
    if (previousValidationTrigger.current !== validationTrigger) {
      isValidationTriggered.current = true;
      trigger();
      previousValidationTrigger.current = validationTrigger;
    }
  }, [validationTrigger]);
  
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
            onChange={handleChange}
            error={dirtyFields.title || isWithInitValuesObj.title || isValidationTriggered.current ? errors?.title?.message : ''}
            isInvalid={
              dirtyFields.title || isWithInitValuesObj.title || isValidationTriggered.current ? Boolean(errors?.title?.message) : false
            }
          />
          
          <TextArea
            {...register('description')}
            onChange={handleChange}
            label={t('courses.courseDescription')}
            placeholder={t('courses.enterCourseDescription')}
            error={dirtyFields.description || isWithInitValuesObj.description || isValidationTriggered.current ? errors?.description?.message : ''}
            isInvalid={
              dirtyFields.description
              || isWithInitValuesObj.description
              || isValidationTriggered.current ? Boolean(errors?.description?.message) : false
            }
          />
        </form>
      </div>
    </div>
  );
};

export default CourseBaseForm;
