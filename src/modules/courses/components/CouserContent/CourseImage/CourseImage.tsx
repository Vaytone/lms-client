import React, { useContext, useMemo } from 'react';
import { ImageBlock } from '@modules/courses/types/builder.types';
import { BuilderContext } from '@modules/courses/contexts/BuilderContext';
import styles from './CourseImage.module.scss';

type Props = {
  item: ImageBlock,
}

const CourseImage: React.FC<Props> = ({ item }) => {
  const { files } = useContext(BuilderContext);
  const image = useMemo(() => files.find((fileItem) => fileItem.id === item.data.fileId)?.file || null, [files, item.data.fileId]);
  
  if (!image) {
    return null;
  }
  
  return (
    <div className={styles.Wrapper}>
      <img className={styles.Image} src={URL.createObjectURL(image)}/>
      {item.data.description && <p className={styles.Description}>{item.data.description}</p>}
    </div>
  );
};

export default CourseImage;
