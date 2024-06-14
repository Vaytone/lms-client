import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';
import { useOutsideClick } from '@shared/hooks/useOutsideClick';
import { hideScrollbar, showScrollbar } from '@shared/helper/visual.helper';
import styles from './SideModal.module.scss';

type Props = {
  children?: React.ReactNode
  outsideHandler?: () => void;
  closeFunc?: () => void;
  withCloseIcon?: boolean,
}

const SideModal: React.FC<Props> = ({ children, outsideHandler, withCloseIcon, closeFunc }) => {
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

export default SideModal;
