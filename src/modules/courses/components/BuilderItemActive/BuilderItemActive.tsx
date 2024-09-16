import React, { useMemo } from 'react';
import { BUILDER_BLOCKS } from '@modules/courses/constants/builder.constants';
import { BuilderBlock } from '@modules/courses/types/builder.types';
import cn from 'classnames';
import styles from './BuilderItemActive.module.scss';

type Props = {
  id: string,
}

const BuilderItemActive: React.FC<Props> = ({ id }) => {
  const builderBlock = useMemo(() => {
    return BUILDER_BLOCKS.find((item) => item.id === id);
  }, [id]) as BuilderBlock;
  
  return (
    <div className={styles.Item}>
      <span className={cn(builderBlock.data.icon, styles.Icon)}/>
      <p className={styles.Title}>{builderBlock.data.title}</p>
    </div>
  );
};

export default BuilderItemActive;
