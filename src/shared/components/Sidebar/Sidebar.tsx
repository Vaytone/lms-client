import React, { useMemo, useState } from 'react';
import { useAppSelector } from '@shared/hooks/redux';
import { RoleEnum } from '@type/role.types';
import { SidebarNavList } from '@components/Sidebar/types';
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
    icon: 'icon-profile',
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

//

const getLinkClass = ({ isActive }: { isActive: boolean }) => cn(
  styles.SidebarNavItem,
  isActive && styles.SidebarNavItemActive,
);

const Sidebar: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navArr = useMemo(() => getUserNavList(user?.role), [user]);
  const { t } = useTranslation();
  
  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };
  
  return (
    <aside className={cn(
      styles.SidebarWrapper,
      isSidebarOpen && styles.SidebarWrapperActive,
    )}
    >
      <div className={styles.SidebarHeader}>
        <NavLink to='/'>
          <img src={`${STATIC_HREF}/logo.svg`} alt='logo'/>
        </NavLink>
        <span
          className={cn(
            styles.SidebarMenuButton,
            isSidebarOpen ? 'icon-left' : 'icon-menu',
            isSidebarOpen && styles.SidebarMenuButtonActive,
          )}
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        />
      </div>
      <div className={styles.SidebarUser}>
        {/*<UserDropdown/>*/}
      </div>
      <nav className={styles.SidebarNav}>
        {navArr.map((item) => {
          return (
            <NavLink
              key={`sidebar-${item.text}`}
              to={item.to}
              onClick={handleCloseSidebar}
              className={getLinkClass}
            >
              <span className={item.icon} />
              <p className={styles.SidebarNavText}>{t(item.text)}</p>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
