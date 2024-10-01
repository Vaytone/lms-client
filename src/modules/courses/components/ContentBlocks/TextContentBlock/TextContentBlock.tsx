import React, { ChangeEvent, memo, useContext, useEffect, useMemo, useRef } from 'react';
import { TitleBlock } from '@modules/courses/types/builder.types';
import { useTranslation } from 'react-i18next';
import TextArea from '@components/ui/TextArea/Input';
import { BuilderContext } from '@modules/courses/contexts/BuilderContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { t } from 'i18next';
import { BUILDER_ITEM_VALIDATION } from '@modules/courses/constants/validation';

type Props = {
  item: TitleBlock
}

const textContentSchema = yup.object({
  text: yup.string()
    .required(t('errors.requiredFiled'))
    .min(BUILDER_ITEM_VALIDATION.minText, t('errors.minLength', { value: BUILDER_ITEM_VALIDATION.minText }))
    .max(BUILDER_ITEM_VALIDATION.maxText, t('auth.maxLength', { value: BUILDER_ITEM_VALIDATION.maxText })),
});

type TextContentForm = {
  text: string,
}

const TextContentBlock: React.FC<Props> = ({ item }) => {
  const {
    setValue,
    watch,
    trigger,
    formState: { errors, isDirty },
  } = useForm<TextContentForm>({
    mode: 'all',
    defaultValues: {
      text: item.data.text,
    },
    resolver: yupResolver(textContentSchema),
  });
  const isWithInitValues = useMemo(() => Boolean(item.data.text.trim()), []);
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
  
  const handleChange = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    handleChangeItemsData(item.id, e.target.name, e.target.value);
    setValue('text', e.target.value, { shouldDirty: true });
    trigger()
      .then((res) => {
        handleItemsError(item.id, res);
      });
  };
  
  return (
    <TextArea
      name='text'
      value={item.data.text}
      onChange={handleChange}
      label={t('courses.text')}
      error={isDirty || isWithInitValues || isValidationTriggered.current ? errors?.text?.message : ''}
      isInvalid={isDirty || isWithInitValues || isValidationTriggered.current ? Boolean(errors?.text?.message) : false}
      placeholder={t('courses.enterText')}
    />
  );
};

export default memo(TextContentBlock);
