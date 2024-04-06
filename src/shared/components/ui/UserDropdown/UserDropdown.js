import React, { useRef, useState } from 'react';
import cn from 'classnames';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './UserDropdown.module.scss';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux';
import { logout } from '@modules/auth/redux/thunks';
import { useOutsideClick } from '@shared/hooks/useOutsideClick';
import { STATIC_HREF } from '@shared/constants/core';
const UserDropdown = () => {
    const [isOpen, setOpen] = useState(false);
    const ref = useRef(null);
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
    return (user && (React.createElement("div", { className: styles.UserDropdownWrapper, onClick: handleToggleOpen, ref: ref },
        React.createElement("div", { className: styles.UserDropDownButton },
            React.createElement("img", { className: styles.UserAvatar, src: `${STATIC_HREF}/${user?.avatar}`, alt: `${user.firstName} ${user.lastName} avatar` }),
            React.createElement("div", { className: styles.UserContent },
                React.createElement("p", { className: styles.UserFullName }, `${user.firstName} ${user.lastName}`),
                React.createElement("div", { className: styles.UserControls },
                    React.createElement("span", { className: cn('icon-bottom-big', styles.UserControlsIconDown, !isOpen && styles.UserControlsIconDownActive) }),
                    React.createElement("span", { className: cn('icon-top-big', styles.UserControlsIconUp, isOpen && styles.UserControlsIconUpActive) })))),
        React.createElement("nav", { className: cn(styles.UserDropDownContent, isOpen && styles.UserDropDownContentActive) },
            React.createElement("ul", { className: styles.UserDropDownList },
                React.createElement("li", null,
                    React.createElement(NavLink, { className: ({ isActive }) => cn(styles.UserDropDownNavLink, isActive && styles.UserDropDownNavLinkActive), to: '/profile' },
                        React.createElement("span", { className: 'icon-profile' }),
                        React.createElement("span", null, t('personalInfo')))),
                React.createElement("li", null,
                    React.createElement(NavLink, { className: ({ isActive }) => cn(styles.UserDropDownNavLink, isActive && styles.UserDropDownNavLinkActive), to: '/settings' },
                        React.createElement("span", { className: 'icon-settings' }),
                        React.createElement("span", null, t('settings')))),
                React.createElement("li", null,
                    React.createElement("div", { className: styles.UserDropDownNavLink, onClick: handleLogout },
                        React.createElement("span", { className: 'icon-logout' }),
                        React.createElement("span", null, t('logout')))))))));
};
export default UserDropdown;
