import DefaultTFuncReturn from 'i18next';
import { ChangeEvent } from 'react';
import { UseFormRegister } from 'react-hook-form';

export interface InputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  name: string,
  value?: string,
  placeholder?: string | typeof DefaultTFuncReturn,
  error?: string,
  isInvalid?: boolean,
  isSecure?: boolean,
  label?: string | typeof DefaultTFuncReturn,
  ref?: any,
  disabled?: boolean,
}
