import React from 'react';

export interface ModalProps {
  children?: React.ReactNode
  outsideHandler?: () => void;
  closeFunc?: () => void;
  withCloseIcon?: boolean,
}
