import React from 'react';
import { useAppSelector } from '@shared/hooks/redux';
import { useTranslation } from 'react-i18next';
import { HeaderProps } from '@components/Header/types';
import cn from 'classnames';
import styles from './Header.module.scss';

const Header: React.FC<HeaderProps> = ({ setOpen, isOpen }) => {
  const currentPage = useAppSelector((state) => state.core.currentPage);
  const { t } = useTranslation();
  
  return (
    <header className={styles.Header}>
      <div className={styles.HeaderContent}>
        <span className={cn(styles.HeaderCloseButton, 'icon-menu')} onClick={() => setOpen(!isOpen)}/>
        <h2>{t(`core.${currentPage}`)}</h2>
      </div>
    </header>
  );
};

export default Header;
