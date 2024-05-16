import React, { FC } from 'react';
import { Oval } from 'react-loader-spinner';
import { LoaderProps } from '@components/Loader/types';
import styles from './Loader.module.scss';

const Loader: FC<LoaderProps> = ({ size, color }) => (
  <div className={styles.LoaderWrapper}>
    <Oval
      color={color || '#8a99e6'}
      secondaryColor='#333a4a'
      height={size || 40}
      width={size || 40}
    />
  </div>
);

export default Loader;
