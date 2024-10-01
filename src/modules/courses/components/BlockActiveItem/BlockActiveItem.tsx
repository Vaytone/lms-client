import React from 'react';
import { DotsSixVertical, List } from '@phosphor-icons/react';
import { BuilderBlockType, HeadingBlock, TitleBlock } from '@modules/courses/types/builder.types';
import TextContentBlock from '@modules/courses/components/ContentBlocks/TextContentBlock/TextContentBlock';
import HeadingContentBlock from '@modules/courses/components/ContentBlocks/HeadingContentBlock/HeadingContentBlock';
import styles from './BlockActiveItem.module.scss';

type Props = {
  item: any,
}

const BlockActiveItem: React.FC<Props> = ({ item }) => {
  const generateContent = () => {
    switch (item.data.type) {
    case BuilderBlockType.Text:
      return <TextContentBlock item={item as TitleBlock}/>;
    case BuilderBlockType.Heading:
      return <HeadingContentBlock item={item as HeadingBlock}/>;
    default:
      return null;
    }
  };
  
  return (
    <div
      className={styles.Task}
    >
      <div className={styles.ItemWrapper}>
        <div
          className={styles.DragIconWrapper}
        >
          <List size={24} className={styles.DragIcon}/>
        </div>
        
        <div className={styles.Content}>
          {generateContent()}
        </div>
      </div>
    </div>
  );
};

export default BlockActiveItem;
