import React from 'react';
import { CommentCourseItem } from '@modules/courses/types/builder.types';
import { ChatCenteredDots } from '@phosphor-icons/react';
import { useAppSelector } from '@shared/hooks/redux';
import styles from './CommentContentBlock.module.scss';

type Props = {
  item: CommentCourseItem,
}

const CommentContentBlock: React.FC<Props> = ({ item }) => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className={styles.CommentWrapper}>
      <div className={styles.IconWrapper}>
        <ChatCenteredDots size={24} />
      </div>
      <div className={styles.TextWrapper}>
        <p className={styles.Text}>{item.data.text}</p>
        <p className={styles.CommentAuthor}>{item.data.author ? item.data.author : user.full_name}</p>
      </div>
    </div>
  );
};

export default CommentContentBlock;
