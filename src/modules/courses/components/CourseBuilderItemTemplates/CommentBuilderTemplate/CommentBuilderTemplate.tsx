import React, { ChangeEvent, memo, useEffect, useMemo, useRef } from 'react';
import Input from '@components/ui/Input/Input';
import { CommentCourseItem } from '@modules/courses/types/builder.types';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextArea from '@components/ui/TextArea/Input';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux';
import { selectCourseItemById } from '@modules/courses/redux/selectors';
import { changeCourseItem, setErrors } from '@modules/courses/redux/slice';
import { t } from 'i18next';
import * as yup from 'yup';
import { BUILDER_ITEM_VALIDATION } from '@modules/courses/constants/validation';

type Props = {
  id: string,
}

type CommentContentForm = {
  text: string,
  author: string,
}

const commentContentSchema = yup.object({
  text: yup.string()
    .required(t('errors.requiredFiled'))
    .min(BUILDER_ITEM_VALIDATION.minComment, t('errors.minLength', { value: BUILDER_ITEM_VALIDATION.minComment }))
    .max(BUILDER_ITEM_VALIDATION.maxComment, t('auth.maxLength', { value: BUILDER_ITEM_VALIDATION.maxComment })),
  author: yup.string()
    .max(BUILDER_ITEM_VALIDATION.maxAuthor, t('auth.maxLength', { value: BUILDER_ITEM_VALIDATION.maxAuthor })),
});

const CommentBuilderTemplate: React.FC<Props> = ({ id }) => {
  const content = useAppSelector((state) => selectCourseItemById(id)(state)) as CommentCourseItem;
  const validationTrigger = useAppSelector((state) => state.courseBuilder.validationTrigger);
  const {
    setValue,
    trigger,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<CommentContentForm>({
    mode: 'all',
    defaultValues: {
      text: content.data.text,
      author: content.data.author,
    },
    resolver: yupResolver(commentContentSchema),
  });
  const isWithInitValuesObj = useMemo(() => ({
    text: Boolean(content.data.text.trim()),
    author: Boolean(content.data.author.trim()),
  }), []);
  const { t } = useTranslation();
  const previousValidationTrigger = useRef(validationTrigger);
  const isValidationTriggered = useRef(false);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    trigger()
      .then((result) => {
        dispatch(setErrors({
          id,
          result,
        }));
      });
  }, []);
  
  useEffect(() => {
    if (previousValidationTrigger.current !== validationTrigger) {
      isValidationTriggered.current = true;
      trigger()
        .then((result) => {
          dispatch(setErrors({
            id,
            result,
          }));
        });
      previousValidationTrigger.current = validationTrigger;
    }
  }, [validationTrigger]);
  
  const handleChange = async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(changeCourseItem({
      id,
      key: e.target.name,
      value: e.target.value,
    }));
    setValue(e.target.name as keyof CommentContentForm, e.target.value, { shouldDirty: true });
    trigger(e.target.name as keyof CommentContentForm)
      .then((result) => {
        dispatch(setErrors({
          id,
          result,
        }));
      });
  };
  
  return (
    <div>
      <TextArea
        name='text'
        value={content.data.text}
        onChange={handleChange}
        label={t('courses.comment')}
        placeholder={t('courses.enterComment')}
        error={dirtyFields.text || isWithInitValuesObj.text || isValidationTriggered.current ? errors?.text?.message : ''}
        isInvalid={dirtyFields.text || isWithInitValuesObj.text || isValidationTriggered.current ? Boolean(errors?.text?.message) : false}
      />
      
      <Input
        name='author'
        value={content.data.author}
        onChange={handleChange}
        label={t('courses.author')}
        placeholder={t('courses.enterAuthor')}
        error={dirtyFields.author || isWithInitValuesObj.author || isValidationTriggered.current ? errors?.author?.message : ''}
        isInvalid={
          dirtyFields.author
          || isWithInitValuesObj.author
          || isValidationTriggered.current ? Boolean(errors?.author?.message) : false
        }
        description={t('courses.commentAuthor')}
      />
    </div>
  );
};

export default memo(CommentBuilderTemplate);
