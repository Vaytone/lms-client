import DefaultTFuncReturn from 'i18next';
import { ChangeEvent } from 'react';

export interface TextAreaProps {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,
  name: string,
  value?: string,
  placeholder?: string | typeof DefaultTFuncReturn,
  error?: string,
  isInvalid?: boolean,
  label?: string | typeof DefaultTFuncReturn,
  ref?: any,
  disabled?: boolean,
}
