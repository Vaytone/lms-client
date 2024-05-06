import React, { ChangeEvent, forwardRef, memo, useCallback, useId, useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import ErrorMessage from '@components/ui/ErrorMessage/ErrorMessage';
import { TextAreaProps } from './types';
import styles from './Input.module.scss';

const TextArea: React.FC<TextAreaProps> = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const {
    label,
    name,
    disabled,
    onChange,
    placeholder,
    value,
    error,
    isInvalid,
  } = props;
  const [touched, setTouched] = useState(true);
  const showError = error && touched;
  const id = useId();
  const { t } = useTranslation();
  
  const handleBlur = useCallback(() => {
    setTouched(true);
  }, []);
  
  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e);
    setTouched(true);
  }, []);
  
  return (
    <div className={styles.InputWrapper}>
      {label && (
        <label htmlFor={id} className={styles.InputLabel}>{label as string}</label>
      )}
      <div className={styles.InputHolder}>
        <textarea
          id={id}
          ref={ref || null}
          name={name}
          className={cn(
            styles.InputElem,
            isInvalid && touched ? styles.InputElemInvalid : '',
          )}
          disabled={disabled}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder as string || t('enterSomething')}
        />
      </div>
      <div className={styles.ErrorMessageWrapper}>
        {showError && <ErrorMessage text={error}/>}
      </div>
    </div>
  );
});

export default memo(TextArea);
