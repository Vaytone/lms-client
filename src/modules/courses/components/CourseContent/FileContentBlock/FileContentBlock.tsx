import React, { useContext, useMemo } from 'react';
import { FileCourseItem } from '@modules/courses/types/builder.types';
import { BuilderContext } from '@modules/courses/context/BuilderContext';
import { FILE_ICONS } from '@modules/courses/constants/builder.icons';
import { DownloadSimple, File } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import styles from './FileContentBlock.module.scss';

type Props = {
  item: FileCourseItem,
}

const FileContentBlock: React.FC<Props> = ({ item }) => {
  const { files } = useContext(BuilderContext);
  const file = useMemo(() => files.find((fileItem) => fileItem.id === item.data.fileId)?.file || null, [files, item.data.fileId]);
  const fileInfo = useMemo(() => {
    if (!file) return null;
    
    return {
      icon: FILE_ICONS[file.name.split('.')[file.name.split('.').length - 1]] || <File/>,
      mb: Number(((file.size || 0.1) / (1024 * 1024)).toFixed(2)),
      kb: Number((file.size / 1024).toFixed(2)),
    };
  }, [file]);
  const { t } = useTranslation();
  
  if (!file || !fileInfo) {
    return null;
  }
  
  return (
    <div className={styles.FileWrapper}>
      <div className={styles.FileContent}>
        {FILE_ICONS[file.name.split('.')[file.name.split('.').length - 1]] || <File/>}
        <div className={styles.FileTextWrapper}>
          <p className={styles.FileText}>{file.name}</p>
          <span
            className={styles.FileSize}
          >
            {fileInfo.mb > 0.09 ? `${fileInfo.mb} ${t('courses.mb')}` : `${fileInfo.kb} ${t('courses.kb')}`}
          </span>
        </div>
        
        <DownloadSimple
          className={styles.Download}
        />
      </div>
    </div>
  );
};

export default FileContentBlock;
