import React, { useMemo } from 'react';
import { useAppSelector } from '@shared/hooks/redux';
import { RoleEnum } from '@type/role.types';
import { SidebarNavList, SidebarProps } from '@components/Sidebar/types';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { STATIC_HREF } from '@shared/constants/core';
import cn from 'classnames';
import styles from './Sidebar.module.scss';

export const SIDEBAR_ADMIN_LIST: SidebarNavList[] = [

];

export const SIDEBAR_OWNER_LIST: SidebarNavList[] = [
  {
    text: 'core.members',
    icon: 'icon-member-bold',
    to: '/members',
  },
  {
    text: 'core.applications',
    icon: 'icon-application',
    to: '/applications',
  },
  {
    text: 'core.courses',
    icon: 'icon-course',
    to: '/courses',
  },
];

export const SIDEBAR_STUDENT_LIST: SidebarNavList[] = [
];

export const SIDEBAR_WATCHER_LIST: SidebarNavList[] = [
];

const getUserNavList = (role: string): SidebarNavList[] => {
  switch (role) {
  case RoleEnum.Owner:
    return SIDEBAR_OWNER_LIST;
  default:
    return [];
  }
};

const getLinkClass = ({ isActive }: { isActive: boolean }) => cn(
  styles.SidebarNav,
  isActive && styles.SidebarNavActive,
);

const Sidebar: React.FC<SidebarProps> = ({ setOpen, isOpen }) => {
  const user = useAppSelector((state) => state.auth.user);
  const navArr = useMemo(() => getUserNavList(user?.role), [user]);
  const { t } = useTranslation();
  
  return (
    <aside className={cn(styles.SidebarWrapper, isOpen && styles.SidebarWrapperOpen)}>
      <div className={styles.SidebarContent}>
        <div className={styles.SidebarLogo}>
          <img src={`${STATIC_HREF}/logo.svg`} alt='logo'/>
          <p className={styles.AuthLogoText}>
            VAYTONE LMS
          </p>
          <span className={cn('icon-small-cross', styles.SidebarCloseIcon)} onClick={() => setOpen(!isOpen)}/>
        </div>
        <ul className={styles.SidebarNavList}>
          {navArr.map((item) => {
            return (
              <li className={styles.SidebarNavItem} key={item.to}>
                <NavLink to={item.to} className={getLinkClass}>
                  <span className={item.icon}/>
                  <p>{t(item.text)}</p>
                </NavLink>
              </li>
            );
          })}
        </ul>
      
      </div>
    </aside>
  );
};

export default Sidebar;
