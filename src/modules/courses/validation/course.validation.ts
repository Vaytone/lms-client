import * as yup from 'yup';
import i18next from 'i18next';
import { BUILDER_ITEM_VALIDATION, COURSE_VALIDATION } from '@modules/courses/constants/validation';

const t = i18next.t;

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

export const headingContentSchema = yup.object({
  text: yup.string()
    .required(t('errors.requiredFiled'))
    .min(BUILDER_ITEM_VALIDATION.minHeading, t('errors.minLength', { value: BUILDER_ITEM_VALIDATION.minHeading }))
    .max(BUILDER_ITEM_VALIDATION.maxHeading, t('auth.maxLength', { value: BUILDER_ITEM_VALIDATION.maxHeading })),
});

export const commentContentSchema = yup.object({
  text: yup.string()
    .required(t('errors.requiredFiled'))
    .min(BUILDER_ITEM_VALIDATION.minComment, t('errors.minLength', { value: BUILDER_ITEM_VALIDATION.minComment }))
    .max(BUILDER_ITEM_VALIDATION.maxComment, t('auth.maxLength', { value: BUILDER_ITEM_VALIDATION.maxComment })),
  author: yup.string()
    .max(BUILDER_ITEM_VALIDATION.maxAuthor, t('auth.maxLength', { value: BUILDER_ITEM_VALIDATION.maxAuthor })),
});

export const fileContentSchema = yup.object({
  fileId: yup.string()
    .required(t('errors.requiredFiled')),
});

export const imageContentSchema = yup.object({
  fileId: yup.string()
    .required(t('errors.requiredFiled')),
  description: yup.string()
    .optional()
    .max(BUILDER_ITEM_VALIDATION.maxImageDescription, t('errors.maxLength', { value: BUILDER_ITEM_VALIDATION.maxImageDescription })),
});

export const textContentSchema = yup.object({
  text: yup.string()
    .required(t('errors.requiredFiled')),
  clearText: yup.string()
    .required(t('errors.requiredFiled'))
    .min(BUILDER_ITEM_VALIDATION.minText, t('errors.minLength', { value: BUILDER_ITEM_VALIDATION.minText }))
    .max(BUILDER_ITEM_VALIDATION.maxText, t('courses.toMuchCharacters')),
});

export const courseBlockSchema = yup.object({
  title: yup.string()
    .optional()
    .max(COURSE_VALIDATION.maxBlockTitle, t('auth.maxLength', { value: COURSE_VALIDATION.maxBlockTitle })),
});
