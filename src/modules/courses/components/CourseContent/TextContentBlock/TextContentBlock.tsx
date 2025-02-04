import React from 'react';
import { TextCourseItem } from '@modules/courses/types/builder.types';
import SanitizeHTML from '@components/SanitizeHTML/SanitizeHTML';
import styles from './TextContentBlock.module.scss';

type Props = {
  item: TextCourseItem,
}

const TextContentBlock: React.FC<Props> = ({ item }) => {
  return (
    <div className={styles.TextWrapper}>
      <SanitizeHTML html={item.data.text}/>
    </div>
  );
};

export default TextContentBlock;
