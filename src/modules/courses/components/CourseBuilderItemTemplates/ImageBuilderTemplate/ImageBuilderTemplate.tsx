import React, { ChangeEvent, memo, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import { BuilderFile, ImageCourseItem } from '@modules/courses/types/builder.types';
import { BUILDER_IMAGES_KEY } from '@modules/courses/constants/builder';
import { UploadSimple } from '@phosphor-icons/react';
import Input from '@components/ui/Input/Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { BuilderContext } from '@modules/courses/context/BuilderContext';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux';
import { changeCourseItem, setErrors } from '@modules/courses/redux/slice';
import { selectCourseItemById } from '@modules/courses/redux/selectors';
import cn from 'classnames';
import ErrorMessage from '@components/ui/ErrorMessage/ErrorMessage';
import { t } from 'i18next';
import * as yup from 'yup';
import { BUILDER_ITEM_VALIDATION } from '@modules/courses/constants/validation';
import styles from './ImageBuilderTemplate.module.scss';

type Props = {
  id: string,
}

type ImageContentForm = {
  fileId: string,
  description: string,
}

const imageContentSchema = yup.object({
  fileId: yup.string()
    .required(t('errors.requiredFiled')),
  description: yup.string()
    .optional()
    .max(BUILDER_ITEM_VALIDATION.maxImageDescription, t('errors.maxLength', { value: BUILDER_ITEM_VALIDATION.maxImageDescription })),
});

const fileTypes = ['JPG', 'PNG', 'GIF'];

const ImageBuilderTemplate: React.FC<Props> = ({ id }) => {
  const content = useAppSelector((state) => selectCourseItemById(id)(state)) as ImageCourseItem;
  const {
    setValue,
    trigger,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<ImageContentForm>({
    mode: 'all',
    defaultValues: {
      fileId: content.data.fileId,
      description: content.data?.description,
    },
    resolver: yupResolver(imageContentSchema),
  });
  const [isDragging, setDragging] = useState<boolean>(false);
  const { files, setFiles, iDb } = useContext(BuilderContext);
  const validationTrigger = useAppSelector((state) => state.courseBuilder.validationTrigger);
  const file = useMemo(() => {
    return files.find((fileItem) => fileItem.itemId === id)?.file || null;
  }, [files]);
  const isWithInitValues = useMemo(() => Boolean(content.data?.description?.trim() || ''), []);
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
      return [...prev.filter((fileItem) => fileItem.itemId !== id), fileData];
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

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue('description', e.target.value, { shouldDirty: true });
    
    trigger(['description'])
      .then((result) => {
        dispatch(setErrors({
          id,
          result,
        }));
      });

    dispatch(changeCourseItem({
      id,
      key: e.target.name,
      value: e.target.value,
    }));
  };
  
  return (
    <>
      <p className={styles.Label}>{t('courses.image')}</p>
      
      {file ? (
        <div className={styles.ImagerWrapper}>
          <div className={styles.Delete} onClick={handleDeleteImage}>
            <span className="icon-cross"/>
          </div>
          <img alt='Uploaded' className={styles.Image} src={URL.createObjectURL(file)}/>
        </div>
      ) : (
        <div className={styles.Wrapper}>
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
            maxSize={100}
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
      
      {file ? (
        <Input
          name="description"
          value={content.data.description}
          onChange={handleTextChange}
          label={t('courses.description')}
          placeholder={t('courses.enterDescription')}
          error={isDirty || isWithInitValues || isValidationTriggered.current ? errors?.description?.message : ''}
          isInvalid={isDirty || isWithInitValues || isValidationTriggered.current ? Boolean(errors?.description?.message) : false}
        />
      ) : null}
    </>
  );
};

export default memo(ImageBuilderTemplate);
