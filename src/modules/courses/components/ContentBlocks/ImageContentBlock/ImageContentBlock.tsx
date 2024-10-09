import React, { ChangeEvent, memo, useContext, useEffect, useMemo, useRef } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import { BuilderFile, ImageBlock } from '@modules/courses/types/builder.types';
import { BuilderContext } from '@modules/courses/contexts/BuilderContext';
import { BUILDER_IMAGES_KEY } from '@modules/courses/constants/builder';
import { UploadSimple } from '@phosphor-icons/react';
import Input from '@components/ui/Input/Input';
import * as yup from 'yup';
import { t } from 'i18next';
import { BUILDER_ITEM_VALIDATION } from '@modules/courses/constants/validation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './ImageContentBlock.module.scss';

type Props = {
  item: ImageBlock,
}

type ImageContentForm = {
  fileId: string,
  description: string,
}

const fileTypes = ['JPG', 'PNG', 'GIF'];

const imageContentSchema = yup.object({
  fileId: yup.string()
    .required(t('errors.requiredFiled')),
  description: yup.string()
    .optional()
    .max(BUILDER_ITEM_VALIDATION.maxImageDescription, t('errors.maxLength', { value: BUILDER_ITEM_VALIDATION.maxImageDescription })),
});

const ImageContentBlock: React.FC<Props> = ({ item }) => {
  const {
    setValue,
    trigger,
    formState: { errors, isDirty },
  } = useForm<ImageContentForm>({
    mode: 'all',
    defaultValues: {
      fileId: item.data.fileId,
      description: item.data?.description,
    },
    resolver: yupResolver(imageContentSchema),
  });
  const { files, setFiles, iDb, handleChangeItemsData, handleItemsError, validationTrigger } = useContext(BuilderContext);
  const file = useMemo(() => {
    return files.find((fileItem) => fileItem.itemId === item.id)?.file || null;
  }, [files]);
  const isWithInitValues = useMemo(() => Boolean(item.data?.description?.trim() || ''), []);
  const isValidationTriggered = useRef(false);
  const isFirstRender = useRef(true);
  const { t } = useTranslation();
  
  useEffect(() => {
    trigger()
      .then((res) => {
        handleItemsError(item.id, res);
      });
  }, []);
  
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      isValidationTriggered.current = true;
      trigger()
        .then((res) => {
          handleItemsError(item.id, res);
        });
    }
  }, [validationTrigger]);
  
  const handleChange = (file: File) => {
    const fileData: BuilderFile = {
      id: uuidv4(),
      itemId: item.id,
      file,
    };
    
    handleChangeItemsData(item.id, 'fileId', fileData.id);
    
    setFiles((prev) => {
      return [...prev.filter((fileItem) => fileItem.itemId !== item.id), fileData];
    });
    
    if (iDb) {
      const transaction = iDb.transaction(BUILDER_IMAGES_KEY, 'readwrite');
      const store = transaction.objectStore(BUILDER_IMAGES_KEY);
      
      const deleteRequest = store.index('itemId').openCursor(IDBKeyRange.only(item.id));
      
      deleteRequest.onsuccess = (event: Event) => {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          store.delete(cursor.primaryKey);
          cursor.continue();
        } else {
          const addRequest = store.put({ id: fileData.id, itemId: fileData.itemId, file });
          
          addRequest.onsuccess = () => {
            setFiles((prev) => {
              return [...prev.filter((fileItem) => fileItem.itemId !== item.id), fileData];
            });
          };
        }
      };
    }
  };
  
  const handleDeleteImage = () => {
    handleChangeItemsData(item.id, 'fileId', null);
    
    setFiles((prev) => {
      return [...prev.filter((fileItem) => fileItem.itemId !== item.id)];
    });
    
    if (iDb) {
      const transaction = iDb.transaction(BUILDER_IMAGES_KEY, 'readwrite');
      const store = transaction.objectStore(BUILDER_IMAGES_KEY);
      
      const deleteRequest = store.index('itemId').openCursor(IDBKeyRange.only(item.id));
      
      deleteRequest.onsuccess = (event: Event) => {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          store.delete(cursor.primaryKey);
          cursor.continue();
        }
      };
    }
  };
  
  console.log(errors);
  
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue('description', e.target.value, { shouldDirty: true });
    
    trigger(['description'])
      .then((res) => {
        console.log(res);
        handleItemsError(item.id, res);
      });
    
    handleChangeItemsData(item.id, 'description', e.target.value);
  };
  
  return (
    <>
      <p className={styles.Label}>{t('courses.image')}</p>
      
      {file ? (
        <div className={styles.ImagerWrapper}>
          <div className={styles.Delete} onClick={handleDeleteImage}>
            <span className="icon-cross"/>
          </div>
          <img alt='Uploaded image' className={styles.Image} src={URL.createObjectURL(file)}/>
        </div>
      ) : (
        <div className={styles.Wrapper}>
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
            maxSize={10}
            hoverTitle={t('courses.dropHere')}
            classes={[]}
            dropMessageStyle={{
              backgroundColor: '#f1f1f1',
              color: '#000',
            }}
          >
            <div className={styles.Content}>
              <UploadSimple size={32}/>
              
              <p>
                {`${t('courses.chooseFile')} `}
                <span>
                  {`${t('courses.orDragItHere')}`}
                </span>
              </p>
            </div>
          </FileUploader>
        </div>
      )}
      
      {file ? (
        <Input
          name='description'
          value={item.data.description}
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

export default memo(ImageContentBlock);
