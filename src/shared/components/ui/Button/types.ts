import React, { ReactNode } from 'react';

export interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  text: string,
  disabled?: boolean,
  icon?: string | ReactNode,
  isDanger?: boolean,
  isLoading?: boolean,
  styleType?: 'transparent' | 'default' | 'bordered' | 'danger',
  type?: 'submit' | 'button',
}
