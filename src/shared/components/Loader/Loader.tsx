import React, { FC } from 'react';
import { Oval } from 'react-loader-spinner';
import { LoaderProps } from '@components/Loader/types';
import styles from './Loader.module.scss';

const Loader: FC<LoaderProps> = ({ size }) => (
  <div className={styles.LoaderWrapper}>
    <Oval
      color='#2C9E95'
      secondaryColor='#333a4a'
      height={40 || size}
      width={40 || size}
    />
  </div>
);

export default Loader;
