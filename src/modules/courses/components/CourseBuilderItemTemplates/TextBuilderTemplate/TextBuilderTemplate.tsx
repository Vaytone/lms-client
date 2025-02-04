import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { t } from 'i18next';
import { BUILDER_ITEM_VALIDATION } from '@modules/courses/constants/validation';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convert } from 'html-to-text';
import TextEditor from '@components/ui/TextEditor/TextEditor';
import { changeCourseItem, setErrors } from '@modules/courses/redux/slice';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux';
import { selectCourseItemById } from '@modules/courses/redux/selectors';
import { TextCourseItem } from '@modules/courses/types/builder.types';

type Props = {
  id: string,
}

type TextContentForm = {
  text: string,
  clearText: string,
}

const textContentSchema = yup.object({
  text: yup.string()
    .required(t('errors.requiredFiled')),
  clearText: yup.string()
    .required(t('errors.requiredFiled'))
    .min(BUILDER_ITEM_VALIDATION.minText, t('errors.minLength', { value: BUILDER_ITEM_VALIDATION.minText }))
    .max(BUILDER_ITEM_VALIDATION.maxText, t('courses.toMuchCharacters')),
});

const TextBuilderTemplate: React.FC<Props> = ({ id }) => {
  const content = useAppSelector((state) => selectCourseItemById(id)(state)) as TextCourseItem;
  const {
    setValue,
    trigger,
    formState: { errors, isDirty },
  } = useForm<TextContentForm>({
    mode: 'all',
    defaultValues: {
      text: content.data.text,
      clearText: content.data.text ? convert(content.data.text).replace(/[\n\r\t]/gm, '').trim() : '',
    },
    resolver: yupResolver(textContentSchema),
  });
  const validationTrigger = useAppSelector((state) => state.courseBuilder.validationTrigger);
  const isWithInitValues = useMemo(() => Boolean(content.data.text.trim()), []);
  const [editorValue, setEditorValue] = useState(content.data.text.trim() || '');
  const { t } = useTranslation();
  const previousValidationTrigger = useRef(validationTrigger);
  const isValidationTriggered = useRef(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    trigger(['clearText'])
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
  
  const handleChange = async (value: string) => {
    setEditorValue(value);
    const text = convert(value).replace(/[\n\r\t]/gm, '').trim();
    dispatch(changeCourseItem({
      id,
      key: 'text',
      value,
    }));
    
    setValue('text', value, { shouldDirty: true });
    setValue('clearText', text, { shouldDirty: true });
    trigger(['clearText'])
      .then((result) => {
        dispatch(setErrors({
          id,
          result,
        }));
      });
  };
  
  return (
    <TextEditor
      label={t('courses.text')}
      value={editorValue}
      onChange={handleChange}
      error={isDirty || isWithInitValues || isValidationTriggered.current ? errors?.clearText?.message : ''}
      isInvalid={isDirty || isWithInitValues || isValidationTriggered.current ? Boolean(errors?.clearText?.message) : false}
    />
  );
};

export default memo(TextBuilderTemplate);
