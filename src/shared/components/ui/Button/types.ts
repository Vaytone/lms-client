import React from 'react';

export interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  text: string,
  disabled?: boolean,
  icon?: string,
  isDanger?: boolean,
  type?: 'submit' | 'button',
}
