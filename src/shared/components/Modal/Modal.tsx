import React, { useEffect, useRef } from 'react';
import cn from 'classnames';
import { hideScrollbar, showScrollbar } from '@shared/helper/visual.helper';
import { createPortal } from 'react-dom';
import { useOutsideClick } from '@shared/hooks/useOutsideClick';
import styles from './Modal.module.scss';
import { ModalProps } from './types';

const Modal: React.FC<ModalProps> = ({ children, outsideHandler, withCloseIcon, closeFunc }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick(modalRef, outsideHandler || (() => null));
  
  const handleEscapeKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      if (outsideHandler) {
        outsideHandler();
        return;
      }
      if (closeFunc) {
        closeFunc();
      }
    }
  };
  
  const handleClose = () => {
    if (outsideHandler) {
      outsideHandler();
      return;
    }
    if (closeFunc) {
      closeFunc();
    }
  };
  
  useEffect(() => {
    const hasScroll = document.documentElement.scrollHeight > window.innerHeight;
    window.addEventListener('keydown', handleEscapeKeyPress);
    
    if (hasScroll) {
      hideScrollbar();
      
      return () => {
        showScrollbar();
        window.removeEventListener('keydown', handleEscapeKeyPress);
      };
    }
    
    return () => {
      window.removeEventListener('keydown', handleEscapeKeyPress);
    };
  }, []);
  
  const mount = document.getElementById('portal-root');
  
  return createPortal(
    <div className={styles.ModalBg}>
      <div
        ref={modalRef}
        className={styles.ModalContent}
      >
        {withCloseIcon && (
          <span
            className={cn('icon-small-cross', styles.ModalClose)}
            onClick={handleClose}
          />
        )}
        {children}
      </div>
    </div>,
    mount as HTMLElement,
  );
};

export default Modal;
