import React, { useId } from 'react';
import styles from './UserSearchSelect.module.scss';

type Option = {
  label: string,
  value: number,
}

type Props = {
  options: Option[],
  selected: number[],
  onChange: (val: Option) => void,
  disabled?: boolean,
  label?: string,
  placeholder?: string
}

const UserSearchSelect: React.FC<Props> = (props) => {
  const {
    selected,
    onChange,
    options,
    disabled,
    label,
    placeholder,
  } = props;
  const id = useId();
  
  return (
    <div>
      {label && (
        <label htmlFor={id} className={styles.InputLabel}>{label as string}</label>
      )}
      <div className={styles.Holder}>
        {placeholder && !selected.length && <p>{placeholder}</p>}
        <input/>
      </div>
    </div>
  );
};

export default UserSearchSelect;
