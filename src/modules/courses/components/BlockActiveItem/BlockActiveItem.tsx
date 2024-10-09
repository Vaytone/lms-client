import React from 'react';
import { List } from '@phosphor-icons/react';
import {
  BuilderBlockType, BuilderItem,
  CommentBlock,
  DividerBlock,
  HeadingBlock,
  TitleBlock,
} from '@modules/courses/types/builder.types';
import TextContentBlock from '@modules/courses/components/ContentBlocks/TextContentBlock/TextContentBlock';
import HeadingContentBlock from '@modules/courses/components/ContentBlocks/HeadingContentBlock/HeadingContentBlock';
import DividerContentBlock from '@modules/courses/components/ContentBlocks/DividerContentBlock/DividerContentBlock';
import CommentContentBlock from '@modules/courses/components/ContentBlocks/CommentContentBlock/CommentContentBlock';
import styles from './BlockActiveItem.module.scss';

type Props = {
  item: BuilderItem,
}

const BlockActiveItem: React.FC<Props> = ({ item }) => {
  const generateContent = () => {
    switch (item.data.type) {
    case BuilderBlockType.Text:
      return <TextContentBlock item={item as TitleBlock}/>;
    case BuilderBlockType.Heading:
      return <HeadingContentBlock item={item as HeadingBlock}/>;
    case BuilderBlockType.Comment:
      return <CommentContentBlock item={item as CommentBlock}/>;
    case BuilderBlockType.Divider:
      return <DividerContentBlock item={item as DividerBlock}/>;
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
