import React from 'react';
import { STATIC_HREF } from '@shared/constants/core';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import UserDropdown from '@components/ui/UserDropdown/UserDropdown';
import { useAppSelector } from '@shared/hooks/redux';

const Header: React.FC = () => {
	const organisationName = useAppSelector((state) => state.auth.user.organisation.short_name);
	
  return (
    <header className={styles.HeaderWrapper}>
      <div className={styles.LogoWrapper}>
	      <NavLink to='/' className={styles.HeaderLogo}>
		      <img src={`${STATIC_HREF}/logo.svg`} alt='logo'/>
	      </NavLink>
	      <p className={styles.LogoText}>{organisationName}</p>
      </div>
      <div className={styles.HeaderContentWrapper}>
        <UserDropdown/>
      </div>
    </header>
  );
};

export default Header;
