import React from 'react';
import cn from 'classnames';
import { ButtonProps } from '@components/ui/Button/types';
import Loader from '@components/Loader/Loader';
import styles from './Button.module.scss';

const Button: React.FC<ButtonProps> = (
  { onClick, text, disabled, icon, isDanger, type, styleType, isLoading },
) => {
  return (
    <button
      className={cn(
        styles.ButtonElem,
        isDanger && styles.ButtonElemDanger,
        styleType === 'transparent' && styles.ButtonElemTransparent,
        styleType === 'bordered' && styles.ButtonElemBordered,
        styleType === 'danger' && styles.ButtonElemDanger,
      )}
      disabled={disabled}
      onClick={onClick || null}
      type={type || 'button'}
    >
      {isLoading ? <Loader size={15} color={styleType === 'transparent' ? '#c1c1c1' : '#ffffff'}/> : (
        <>
          {icon && typeof icon === 'string' ? <span className={cn(styles.ButtonIcon, icon)}/> : null}
          {icon && typeof icon !== 'string' ? icon : null}
          <span className={styles.ButtonText}>{text}</span>
        </>
      )}
    </button>
  );
};

export default Button;
