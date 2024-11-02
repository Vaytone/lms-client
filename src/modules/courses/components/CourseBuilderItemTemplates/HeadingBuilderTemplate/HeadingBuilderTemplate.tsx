import React, { memo } from 'react';
import { useForm } from 'react-hook-form';
import { BUILDER_ITEM_VALIDATION } from '@modules/courses/constants/validation';
import * as yup from 'yup';
import { t } from 'i18next';
import { selectCourseItemById } from '@modules/courses/redux/selectors';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux';
import Input from '@components/ui/Input/Input';
import { changeCourseItem } from '@modules/courses/redux/slice';

const textContentSchema = yup.object({
  text: yup.string()
    .required(t('errors.requiredFiled'))
    .min(BUILDER_ITEM_VALIDATION.minHeading, t('errors.minLength', { value: BUILDER_ITEM_VALIDATION.minHeading }))
    .max(BUILDER_ITEM_VALIDATION.maxHeading, t('auth.maxLength', { value: BUILDER_ITEM_VALIDATION.maxHeading })),
});

type TextContentForm = {
  text: string,
}

type Props = {
  id: string,
}

const HeadingBuilderTemplate: React.FC<Props> = ({ id }) => {
  const content = useAppSelector((state) => selectCourseItemById(id)(state));
  console.log(`UPDATE HERE -> ${id}`, content);
  const {
    setValue,
    trigger,
    formState: { errors, isDirty },
  } = useForm<TextContentForm>({
    mode: 'all',
    defaultValues: {
      text: content.data.text,
    },
    resolver: yupResolver(textContentSchema),
  });
  const dispatch = useAppDispatch();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeCourseItem({
      id,
      key: e.target.name,
      value: e.target.value,
    }));
  };
  
  return (
    <Input
      name='text'
      value={content.data.text}
      onChange={handleChange}
      label={t('courses.heading')}
      placeholder={t('courses.enterHeading')}
      // error={isDirty || isWithInitValues || isValidationTriggered.current ? errors?.text?.message : ''}
      // isInvalid={isDirty || isWithInitValues || isValidationTriggered.current ? Boolean(errors?.text?.message) : false}
    />
  );
};

export default memo(HeadingBuilderTemplate);
