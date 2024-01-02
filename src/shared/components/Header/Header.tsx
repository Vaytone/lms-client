import React from 'react';
import { STATIC_HREF } from '@shared/constants/core';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.HeaderWrapper}>
      <NavLink to='/' className={styles.HeaderLogo}>
        <img src={`${STATIC_HREF}/logo.svg`} alt='logo'/>
      </NavLink>
      <div className={styles.HeaderContentWrapper}>
        {/*<UserDropdown/>*/}
      </div>
    </header>
  );
};

export default Header;
