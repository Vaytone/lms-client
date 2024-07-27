import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useOutsideClick } from '@shared/hooks/useOutsideClick';
import cn from 'classnames';
import Loader from '@components/Loader/Loader';
import { BASE_IMG_URI, DEFAULT_AVATAR_HREF } from '@shared/constants/core';
import { useTranslation } from 'react-i18next';
import styles from './UserSearchSelect.module.scss';
import ErrorMessage from '@components/ui/ErrorMessage/ErrorMessage';

type SelectItemProps = {
  item: Option,
  index: number,
  options: Option[],
  onChangeValue: (val: Option) => void,
  isSelected: boolean,
}

const SelectItem: React.FC<SelectItemProps> = ({ item, onChangeValue, index, options, isSelected }) => {
  const handleChange = () => {
    onChangeValue(item);
  };

  return (
    <div className={cn(styles.ListItem, isSelected && styles.ListItemSelected)} key={item.id} onClick={handleChange}>
      <div className={cn(styles.ListItemContent, index !== options.length - 1 && styles.ListItemContentBordered)}>
        {item.avatar
          ? <img className={styles.Avatar} src={`${BASE_IMG_URI}/${item.avatar}`} alt={`${item.full_name} avatar`}/>
          : <img className={styles.Avatar} src={DEFAULT_AVATAR_HREF} alt="default avatar"/>}
        <p className={styles.Name}>{item.full_name}</p>
      </div>
    </div>
  );
};

type Option = {
  full_name: string,
  avatar?: string,
  id: number,
}

type Props = {
  options: Option[],
  selected: number,
  onChange: (val: number) => void,
  disabled?: boolean,
  label?: string,
  placeholder?: string,
  isLoading?: boolean,
  error?: string,
  isInvalid?: boolean,
  withoutError?: boolean,
}

const UserSearchSelect: React.FC<Props> = (props) => {
  const {
    selected,
    onChange,
    options,
    disabled,
    label,
    placeholder,
    isLoading,
    error,
    isInvalid,
    withoutError,
  } = props;
  const [inputValue, setInputValue] = useState('');
  const filtered = useMemo(() => {
    return options.filter((item) => item.full_name.includes(inputValue));
  }, [options, inputValue]);
  const currentSelected = useMemo(() => {
    if (selected) {
      return options.find((item) => item.id === selected);
    }

    return null;
  }, [selected]);
  const [isFocused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef(null);
  const [touched, setTouched] = useState(true);
  const showError = error && touched;
  const id = useId();

  const toggleFocused = () => {
    setFocused((prev) => !prev);
  };

  const closeSelect = () => {
    setFocused(false);
    setInputValue('');
    setTouched(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (isFocused) {
      inputRef.current.focus();
    } else {
      inputRef.current.blur();
    }
  }, [isFocused]);

  useOutsideClick(selectRef, closeSelect);

  const handleChangeSelectValue = (item: Option) => {
    onChange(item.id);
    setTouched(true);
    setInputValue('');
  };

  return (
    <div>
      {label && (
        <label htmlFor={id} className={styles.InputLabel}>{label as string}</label>
      )}
      <div className={cn(styles.Holder, isFocused && styles.HolderFocused, isInvalid && styles.HolderError)} onClick={toggleFocused} ref={selectRef}>
        {placeholder && !selected && !inputValue && <p className={styles.Placeholder}>{placeholder}</p>}
        {currentSelected && !inputValue ? (
          <div className={styles.SelectedWrapper}>
            <p className={styles.Selected}>
              {currentSelected.full_name}
            </p>
          </div>
        ) : null}
        <input
          className={styles.Input}
          ref={inputRef}
          onChange={handleChange}
          value={inputValue}
        />
        <div className={cn(styles.IconWrapper, isFocused && styles.IconWrapperFocused, isInvalid && styles.IconWrapperError)}>
          <span className="icon-bottom"/>
        </div>

        {isFocused && (
          <div className={styles.List}>
            {isLoading && <Loader size={20}/>}

            {!isLoading && filtered.length ? (
              filtered.map((item, index) => {
                return (
                  <SelectItem
                    key={item.id}
                    index={index}
                    item={item}
                    onChangeValue={handleChangeSelectValue}
                    options={options}
                    isSelected={currentSelected?.id === item.id}
                  />
                );
              })
            ) : null}

            {!isLoading && !filtered.length ? (
              <p className={styles.NoOptions}>No options</p>
            ) : null}
          </div>
        )}
      </div>
      {withoutError ? null : (
        <div className={styles.ErrorMessageWrapper}>
          {showError && <ErrorMessage text={error}/>}
        </div>
      )}
    </div>
  );
};

export default UserSearchSelect;
