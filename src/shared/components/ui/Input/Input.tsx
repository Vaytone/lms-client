import React, { ChangeEvent, forwardRef, memo, useCallback, useId, useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import ErrorMessage from '@components/ui/ErrorMessage/ErrorMessage';
import { InputProps } from './types';
import styles from './Input.module.scss';

const Input: React.FC<InputProps> = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    label,
    name,
    isSecure,
    disabled,
    onChange,
    placeholder,
    value,
    error,
    isInvalid,
    withoutError,
    description,
  } = props;
  const [show, setShow] = useState(false);
  const [touched, setTouched] = useState(true);
  const showError = error && touched;
  const id = useId();
  const { t } = useTranslation();
  
  const handleBlur = useCallback(() => {
    setTouched(true);
  }, []);
  
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    setTouched(true);
  }, []);
  
  const toggleShow = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setShow(!show);
  }, [show]);
  
  return (
    <div className={styles.InputWrapper}>
      {label && (
        <label htmlFor={id} className={styles.InputLabel}>{label as string}</label>
      )}
      {description && <p className={styles.InputDescription}>{description}</p>}
      <div className={styles.InputHolder}>
        <input
          id={id}
          ref={ref || null}
          name={name}
          className={cn(
            styles.InputElem,
            isInvalid && touched ? styles.InputElemInvalid : '',
            isSecure ? styles.InputElemSecured : '',
          )}
          disabled={disabled}
          value={value}
          type={isSecure ? show ? 'text' : 'password' : 'text'}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder as string || t('enterSomething')}
        />
        {isSecure && (
          <span
            className={cn(styles.InputSecureIcon, {
              'icon-show': show,
              'icon-hide': !show,
            })}
            onClick={toggleShow}
          />
        )}
      </div>
      {withoutError ? null : (
        <div className={styles.ErrorMessageWrapper}>
          {showError && <ErrorMessage text={error}/>}
        </div>
      )}
    </div>
  );
});

export default memo(Input);
