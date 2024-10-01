import React, { useMemo } from 'react';
import { BUILDER_BLOCKS } from '@modules/courses/constants/builder';
import { BuilderBlock, BuilderBlockType, TitleBlock } from '@modules/courses/types/builder.types';
import { BUILDER_ICONS } from '@modules/courses/constants/builder.icons';
import TextContentBlock from '@modules/courses/components/ContentBlocks/TextContentBlock/TextContentBlock';
import HeadingContentBlock from '@modules/courses/components/ContentBlocks/HeadingContentBlock/HeadingContentBlock';
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
      {BUILDER_ICONS[builderBlock.data.icon]}
      <p className={styles.Title}>{builderBlock.data.title}</p>
    </div>
  );
};

export default BuilderItemActive;
