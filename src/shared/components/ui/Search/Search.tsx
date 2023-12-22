import React, { useEffect, useState } from 'react';
import { SearchProps } from '@components/ui/Search/types';
import styles from './Search.module.scss';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

const Search: React.FC<SearchProps> = ({ onSearch, placeholder }) => {
  const [inputValue, setInputValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState(inputValue);
  const { t } = useTranslation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 400);
    
    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue]);
  
  return (
    <div className={styles.SearchWrapper}>
      <input
        className={styles.SearchInput}
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder || t('core.search')}
      />
      <span className={cn('icon-search', styles.SearchIcon)}/>
    </div>
    
  );
};

export default Search;
