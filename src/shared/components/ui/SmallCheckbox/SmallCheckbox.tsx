import React, { useId } from 'react';
import { SmallCheckboxProps } from '@components/ui/SmallCheckbox/types';
import cn from 'classnames';
import styles from './SmallCheckbox.module.scss';

const SmallCheckbox: React.FC<SmallCheckboxProps> = ({ checked, onChange, disabled }) => {
  const id = useId();
  const handleChange = () => {
    onChange(!checked);
  };
  
  return (
    <label className={styles.CheckboxWrapper} aria-label='custom checkbox'>
      <div className={cn(styles.CheckboxCustom, checked && styles.CheckboxCustomChecked)}>
        <span className='icon-check'/>
      </div>
      <input
        type='checkbox'
        id={id}
        disabled={disabled}
        className={cn(styles.CheckboxInput, disabled && styles.CheckboxCustomDisabled)}
        onChange={handleChange}
        checked={checked}
      />
    </label>
  );
};

export default SmallCheckbox;
