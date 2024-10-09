import React, { memo, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { TitleBlock } from '@modules/courses/types/builder.types';
import { useTranslation } from 'react-i18next';
import { BuilderContext } from '@modules/courses/contexts/BuilderContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { t } from 'i18next';
import { BUILDER_ITEM_VALIDATION } from '@modules/courses/constants/validation';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToRaw, EditorState } from 'draft-js';
import { convertFromHTML } from 'draft-convert';
import { convert} from 'html-to-text';
import TextEditor from '@components/ui/TextEditor/TextEditor';

type Props = {
  item: TitleBlock
}

const textContentSchema = yup.object({
  text: yup.string()
    .required(t('errors.requiredFiled')),
  clearText: yup.string()
    .required(t('errors.requiredFiled'))
    .min(BUILDER_ITEM_VALIDATION.minText, t('errors.minLength', { value: BUILDER_ITEM_VALIDATION.minText }))
    .max(BUILDER_ITEM_VALIDATION.maxText, t('courses.toMuchCharacters')),
});

type TextContentForm = {
  text: string,
  clearText: string,
}

const TextContentBlock: React.FC<Props> = ({ item }) => {
  const {
    setValue,
    trigger,
    watch,
    formState: { errors, isDirty },
  } = useForm<TextContentForm>({
    mode: 'all',
    defaultValues: {
      text: item.data.text,
      clearText: item.data.text ? convert(item.data.text) : '',
    },
    resolver: yupResolver(textContentSchema),
  });
  const isWithInitValues = useMemo(() => Boolean(item.data.text.trim()), []);
  const [editorValue, setEditorValue] = useState(item.data.text
    ? EditorState.createWithContent(convertFromHTML(item.data.text))
    : EditorState.createEmpty());
  const { handleChangeItemsData, validationTrigger, handleItemsError } = useContext(BuilderContext);
  const { t } = useTranslation();
  const isFirstRender = useRef(true);
  const isValidationTriggered = useRef(false);
  
  useEffect(() => {
    trigger(['clearText'])
      .then((res) => {
        handleItemsError(item.id, res);
      });
  }, []);
  
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      isValidationTriggered.current = true;
      trigger(['clearText'])
        .then((res) => {
          handleItemsError(item.id, res);
        });
    }
  }, [validationTrigger]);
  
  const handleChange = async (value: EditorState) => {
    setEditorValue(value);
    const html = draftToHtml(convertToRaw(value.getCurrentContent()));
    const text = convert(html);

    handleChangeItemsData(item.id, 'text', html);
    setValue('text', html, { shouldDirty: true });
    setValue('clearText', text, { shouldDirty: true });
    trigger(['clearText'])
      .then((res) => {
        handleItemsError(item.id, res);
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

export default memo(TextContentBlock);
