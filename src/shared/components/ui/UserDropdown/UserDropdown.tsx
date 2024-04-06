import React, { useRef, useState } from 'react';
import cn from 'classnames';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './UserDropdown.module.scss';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux';
import { logout } from '@modules/auth/redux/thunks';
import { useOutsideClick } from '@shared/hooks/useOutsideClick';
import { STATIC_HREF } from '@shared/constants/core';

const UserDropdown: React.FC = () => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const handleLogout = () => {
    dispatch(logout()).then(() => {
      navigate('/login');
    });
  };
  
  const handleToggleOpen = () => {
    setOpen(!isOpen);
  };
  
  const handleCloseDropdown = () => {
    setOpen(false);
  };
  
  useOutsideClick(ref, handleCloseDropdown);
  
  return (
    user && (
      <div
        className={styles.UserDropdownWrapper}
        onClick={handleToggleOpen}
        ref={ref}
      >
        <div className={styles.UserDropDownButton}>
          <img className={styles.UserAvatar} src={`${STATIC_HREF}/${user?.avatar}`} alt={`${user.firstName} ${user.lastName} avatar`}/>
          <div className={styles.UserContent}>
            <p className={styles.UserFullName}>
              {`${user.firstName} ${user.lastName}`}
            </p>
            <div className={styles.UserControls}>
              <span className={cn('icon-bottom-big', styles.UserControlsIconDown, !isOpen && styles.UserControlsIconDownActive)}/>
              <span className={cn('icon-top-big', styles.UserControlsIconUp, isOpen && styles.UserControlsIconUpActive)}/>
            </div>
          </div>
        </div>
        <nav className={cn(styles.UserDropDownContent, isOpen && styles.UserDropDownContentActive)}>
          <ul className={styles.UserDropDownList}>
            <li>
              <NavLink className={({ isActive }) => cn(styles.UserDropDownNavLink, isActive && styles.UserDropDownNavLinkActive)} to='/profile'>
                <span className='icon-profile'/>
                <span>{t('personalInfo')}</span>
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => cn(styles.UserDropDownNavLink, isActive && styles.UserDropDownNavLinkActive)} to='/settings'>
                <span className='icon-settings'/>
                <span>{t('settings')}</span>
              </NavLink>
            </li>
            <li>
              <div className={styles.UserDropDownNavLink} onClick={handleLogout}>
                <span className='icon-logout'/>
                <span>{t('logout')}</span>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    )
  );
};

export default UserDropdown;
