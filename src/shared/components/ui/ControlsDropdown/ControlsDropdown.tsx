import React, { memo, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import { useOutsideClick } from '@shared/hooks/useOutsideClick';
import { useTranslation } from 'react-i18next';
import { ControlsDropdownProps } from './types';
import styles from './ControlsDropdown.module.scss';

const ControlsDropdown: React.FC<ControlsDropdownProps> = ({
  disabled,
  placeholder,
  options,
  preTitle,
  value,
  onChange,
  icon,
}) => {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  
  const currentValue = useMemo(() => {
    return options.find((item) => item.value === value)?.label;
  }, [options, value]);
  
  useOutsideClick(dropdownRef, () => setIsOpen(false));
  
  const handleToggle = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  };
  
  const handleChange = (value: string, disabled: boolean) => {
    if (!disabled) {
      onChange(value);
    }
  };
  
  return (
    <div
      onClick={handleToggle}
      className={cn([styles.Wrapper, isOpen ? styles.WrapperOpen : ''])}
      ref={dropdownRef}
    >
      <div className={styles.Content}>
        {icon && <span className={cn([icon, styles.Icon])}/>}
        {value
          ? <p className={styles.CurrentValue}>{preTitle ? `${preTitle} ${t(currentValue)}` : t(currentValue)}</p>
          : <p>{placeholder || t('core.select')}</p>}
      </div>
      {isOpen && (
        <div className={cn(styles.Dropdown, isOpen ? styles.DropdownOpen : '')}>
          {options.map((option) => {
            return (
              <div
                key={option.value}
                className={cn([styles.DropdownItem, option.value === value && styles.DropdownItemDisabled])}
                onClick={() => handleChange(option.value, option.value === value)}
              >
                {t(option.label)}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default memo(ControlsDropdown);
