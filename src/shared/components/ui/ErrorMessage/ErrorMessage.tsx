import React from 'react';
import { ErrorMessageProps } from '@components/ui/ErrorMessage/types';
import styles from './ErrorMessage.module.scss';

const ErrorMessage: React.FC<ErrorMessageProps> = ({ text }) => {
  return (
    <div className={styles.ErrorWrapper}>
      <span className={styles.ErrorIcon}/>
      <p className={styles.ErrorText}>{text}</p>
    </div>
  );
};

export default ErrorMessage;
