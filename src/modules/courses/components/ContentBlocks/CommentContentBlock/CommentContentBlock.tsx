import React, { ChangeEvent, memo, useContext, useEffect, useMemo, useRef } from 'react';
import Input from '@components/ui/Input/Input';
import { CommentBlock } from '@modules/courses/types/builder.types';
import { useTranslation } from 'react-i18next';
import { BuilderContext } from '@modules/courses/contexts/BuilderContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { t } from 'i18next';
import { BUILDER_ITEM_VALIDATION } from '@modules/courses/constants/validation';
import TextArea from '@components/ui/TextArea/Input';
import styles from './CommentContentBlock.module.scss';

type Props = {
  item: CommentBlock
}

const commentContentSchema = yup.object({
  text: yup.string()
    .required(t('errors.requiredFiled'))
    .min(BUILDER_ITEM_VALIDATION.minComment, t('errors.minLength', { value: BUILDER_ITEM_VALIDATION.minComment }))
    .max(BUILDER_ITEM_VALIDATION.maxComment, t('auth.maxLength', { value: BUILDER_ITEM_VALIDATION.maxComment })),
  author: yup.string()
    .max(BUILDER_ITEM_VALIDATION.maxAuthor, t('auth.maxLength', { value: BUILDER_ITEM_VALIDATION.maxAuthor })),
});

type CommentContentForm = {
  text: string,
  author: string,
}

const HeadingContentBlock: React.FC<Props> = ({ item }) => {
  const {
    setValue,
    trigger,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<CommentContentForm>({
    mode: 'all',
    defaultValues: {
      text: item.data.text,
      author: item.data.author,
    },
    resolver: yupResolver(commentContentSchema),
  });
  const isWithInitValuesObj = useMemo(() => ({
    text: Boolean(item.data.text.trim()),
    author: Boolean(item.data.author.trim()),
  }), []);
  const { handleChangeItemsData, validationTrigger, handleItemsError } = useContext(BuilderContext);
  const { t } = useTranslation();
  const isFirstRender = useRef(true);
  const isValidationTriggered = useRef(false);

  useEffect(() => {
    trigger()
      .then((res) => {
        handleItemsError(item.id, res);
      });
  }, []);
  
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      isValidationTriggered.current = true;
      trigger()
        .then((res) => {
          handleItemsError(item.id, res);
        });
    }
  }, [validationTrigger]);
  
  const handleChange = async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleChangeItemsData(item.id, e.target.name, e.target.value);
    console.log(e.target.name);
    setValue(e.target.name as keyof CommentContentForm, e.target.value, { shouldDirty: true });
    trigger(e.target.name as keyof CommentContentForm)
      .then((res) => {
        handleItemsError(item.id, res);
      });
  };
  
  return (
    <div>
      <TextArea
        name='text'
        value={item.data.text}
        onChange={handleChange}
        label={t('courses.comment')}
        placeholder={t('courses.enterComment')}
        error={dirtyFields.text || isWithInitValuesObj.text || isValidationTriggered.current ? errors?.text?.message : ''}
        isInvalid={dirtyFields.text || isWithInitValuesObj.text || isValidationTriggered.current ? Boolean(errors?.text?.message) : false}
      />
      
      <Input
        name='author'
        value={item.data.author}
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

export default memo(HeadingContentBlock);
