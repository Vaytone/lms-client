import React, { ChangeEvent, memo, useContext, useEffect, useMemo, useRef } from 'react';
import Input from '@components/ui/Input/Input';
import { HeadingBlock } from '@modules/courses/types/builder.types';
import { useTranslation } from 'react-i18next';
import { BuilderContext } from '@modules/courses/contexts/BuilderContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { t } from 'i18next';
import { BUILDER_ITEM_VALIDATION } from '@modules/courses/constants/validation';

type Props = {
  item: HeadingBlock
}

const textContentSchema = yup.object({
  text: yup.string()
    .required(t('errors.requiredFiled'))
    .min(BUILDER_ITEM_VALIDATION.minHeading, t('errors.minLength', { value: BUILDER_ITEM_VALIDATION.minHeading }))
    .max(BUILDER_ITEM_VALIDATION.maxHeading, t('errors.maxLength', { value: BUILDER_ITEM_VALIDATION.maxHeading })),
});

type TextContentForm = {
  text: string,
}

const HeadingContentBlock: React.FC<Props> = ({ item }) => {
  const {
    setValue,
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
  
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeItemsData(item.id, e.target.name, e.target.value);
    setValue('text', e.target.value, { shouldDirty: true });
    trigger()
      .then((res) => {
        handleItemsError(item.id, res);
      });
  };
  
  return (
    <div>
      <Input
        name='text'
        value={item.data.text}
        onChange={handleChange}
        label={t('courses.heading')}
        placeholder={t('courses.enterHeading')}
        error={isDirty || isWithInitValues || isValidationTriggered.current ? errors?.text?.message : ''}
        isInvalid={isDirty || isWithInitValues || isValidationTriggered.current ? Boolean(errors?.text?.message) : false}
      />
    </div>
  );
};

export default memo(HeadingContentBlock);
