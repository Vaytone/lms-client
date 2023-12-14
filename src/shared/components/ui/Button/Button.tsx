import React from 'react';
import cn from 'classnames';
import { ButtonProps } from '@components/ui/Button/types';
import styles from './Button.module.scss';

const Button: React.FC<ButtonProps> = (
  { onClick, text, disabled, icon, isDanger, type },
) => {
  return (
    <button
      className={cn(styles.ButtonElem, isDanger && styles.ButtonElemDanger)}
      disabled={disabled}
      onClick={onClick || null}
      type={type || 'button'}
    >
      {icon && <span className={cn(styles.ButtonIcon, icon)}/>}
      <span className={styles.ButtonText}>{text}</span>
    </button>
  );
};

export default Button;
