import React, { memo, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import { BuilderFile, FileCourseItem } from '@modules/courses/types/builder.types';
import { BUILDER_IMAGES_KEY } from '@modules/courses/constants/builder';
import { File, UploadSimple, X } from '@phosphor-icons/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { BuilderContext } from '@modules/courses/context/BuilderContext';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux';
import { changeCourseItem, setErrors } from '@modules/courses/redux/slice';
import { selectCourseItemById } from '@modules/courses/redux/selectors';
import cn from 'classnames';
import { FILE_ICONS } from '@modules/courses/constants/builder.icons';
import { t } from 'i18next';
import ErrorMessage from '@components/ui/ErrorMessage/ErrorMessage';
import * as yup from 'yup';
import styles from './FileBuilderTemplate.module.scss';

type Props = {
  id: string,
}

type FileContentForm = {
  fileId: string,
}

const fileTypes = ['PDF', 'DOC', 'DOCX', 'PPT', 'PPTX', 'XLS', 'XLSX', 'TXT', 'ZIP', 'RAR'];

const fileContentSchema = yup.object({
  fileId: yup.string().nullable()
    .required(t('errors.requiredFiled')),
});

const FileBuilderTemplate: React.FC<Props> = ({ id }) => {
  const content = useAppSelector((state) => selectCourseItemById(id)(state)) as FileCourseItem;
  const {
    trigger,
    formState: { errors, dirtyFields },
  } = useForm<FileContentForm>({
    mode: 'all',
    defaultValues: {
      fileId: content.data.fileId,
    },
    resolver: yupResolver(fileContentSchema),
  });
  const [isDragging, setDragging] = useState<boolean>(false);
  const { files, setFiles, iDb } = useContext(BuilderContext);
  const validationTrigger = useAppSelector((state) => state.courseBuilder.validationTrigger);
  const file = useMemo(() => {
    return files.find((fileItem) => fileItem.itemId === id)?.file || null;
  }, [files]);
  const fileInfo = useMemo(() => {
    if (!file) return null;
    
    return {
      icon: FILE_ICONS[file.name.split('.')[file.name.split('.').length - 1]] || <File/>,
      mb: Number(((file.size || 0.1) / (1024 * 1024)).toFixed(2)),
      kb: Number((file.size / 1024).toFixed(2)),
    };
  }, [file]);
  const isWithInitValues = useMemo(() => Boolean(content.data?.fileId || ''), []);
  const isValidationTriggered = useRef(false);
  const previousValidationTrigger = useRef(validationTrigger);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    trigger()
      .then((result) => {
        dispatch(setErrors({
          id,
          result,
        }));
      });
  }, []);
  
  useEffect(() => {
    if (previousValidationTrigger.current !== validationTrigger) {
      isValidationTriggered.current = true;
      trigger()
        .then((result) => {
          dispatch(setErrors({
            id,
            result,
          }));
        });
      previousValidationTrigger.current = validationTrigger;
    }
  }, [validationTrigger]);
  
  const handleChange = (file: File) => {
    const fileData: BuilderFile = {
      id: uuidv4(),
      itemId: id,
      file,
    };
    
    dispatch(changeCourseItem({
      id,
      key: 'fileId',
      value: fileData.id,
    }));
    
    setFiles((prev) => {
      return [...prev.filter((fileItem) => fileItem.id !== id), fileData];
    });
    
    if (iDb) {
      const transaction = iDb.transaction(BUILDER_IMAGES_KEY, 'readwrite');
      const store = transaction.objectStore(BUILDER_IMAGES_KEY);
      
      const deleteRequest = store.index('itemId').openCursor(IDBKeyRange.only(id));
      
      deleteRequest.onsuccess = (event: Event) => {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          store.delete(cursor.primaryKey);
          cursor.continue();
        } else {
          const addRequest = store.put({ id: fileData.id, itemId: fileData.itemId, file });
          
          addRequest.onsuccess = () => {
            setFiles((prev) => {
              return [...prev.filter((fileItem) => fileItem.itemId !== id), fileData];
            });
          };
        }
      };
    }
  };
  
  const handleDeleteImage = () => {
    dispatch(changeCourseItem({
      id,
      key: 'fileId',
      value: null,
    }));
    
    setFiles((prev) => {
      return [...prev.filter((fileItem) => fileItem.itemId !== id)];
    });
    
    if (iDb) {
      const transaction = iDb.transaction(BUILDER_IMAGES_KEY, 'readwrite');
      const store = transaction.objectStore(BUILDER_IMAGES_KEY);
      
      const deleteRequest = store.index('itemId').openCursor(IDBKeyRange.only(id));
      
      deleteRequest.onsuccess = (event: Event) => {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          store.delete(cursor.primaryKey);
          cursor.continue();
        }
      };
    }
  };
  
  return (
    <>
      <p className={styles.Label}>{t('courses.file')}</p>
      
      {file && fileInfo ? (
        <div className={styles.FileWrapper}>
          <div className={styles.FileContent}>
            {FILE_ICONS[file.name.split('.')[file.name.split('.').length - 1]] || <File/>}
            <div className={styles.FileTextWrapper}>
              <p className={styles.FileText}>{file.name}</p>
              <span className={styles.FileSize}>{fileInfo.mb > 0.09 ? `${fileInfo.mb} ${t('courses.mb')}` : `${fileInfo.kb} ${t('courses.kb')}`}</span>
            </div>
            
            <X
              className={styles.Delete}
              onClick={handleDeleteImage}
            />
          </div>
        </div>
      ) : (
        <div className={styles.Wrapper}>
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
            maxSize={10}
            hoverTitle={t('courses.dropHere')}
            onDraggingStateChange={setDragging}
          >
            <div className={cn(styles.Content, isDragging && styles.ContentActive)}>
              <UploadSimple size={32}/>
              
              <p>
                {`${t('courses.chooseFile')} `}
                <span>
                  {`${t('courses.orDragItHere')}`}
                </span>
              </p>
            </div>
          </FileUploader>
          <div className={styles.ErrorMessageWrapper}>
            {dirtyFields.fileId
              || isWithInitValues
              || isValidationTriggered.current && <ErrorMessage text={errors?.fileId?.message}/>}
          </div>
        </div>
      )}
    </>
  );
};

export default memo(FileBuilderTemplate);
