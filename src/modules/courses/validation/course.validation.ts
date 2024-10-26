import * as yup from 'yup';
import { t } from 'i18next';
import { COURSE_VALIDATION } from '@modules/courses/constants/validation';

export const courseBaseSchema = yup.object({
  title: yup.string()
    .required(t('errors.requiredFiled'))
    .min(COURSE_VALIDATION.minTitle, t('auth.minLength', { value: COURSE_VALIDATION.minTitle }))
    .max(COURSE_VALIDATION.maxTitle, t('auth.maxLength', { value: COURSE_VALIDATION.maxTitle })),
  description: yup.string()
    .required(t('errors.requiredFiled'))
    .min(COURSE_VALIDATION.minDescription, t('auth.minLength', { value: COURSE_VALIDATION.minDescription }))
    .max(COURSE_VALIDATION.maxDescription, t('auth.maxLength', { value: COURSE_VALIDATION.maxDescription })),
});
