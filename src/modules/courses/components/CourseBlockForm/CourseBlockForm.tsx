import React, { ChangeEvent, useContext, useEffect, useMemo, useRef, useState } from 'react';
import CourseBuilderItem from '@modules/courses/components/CourseBuilderItem/CourseBuilderItem';
import { useTranslation } from 'react-i18next';
import { ArrowsIn, Trash } from '@phosphor-icons/react';
import cn from 'classnames';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Modal from '@components/Modal/Modal';
import DeleteBlockModal from '@modules/courses/components/DeleteBlockModal/DeleteBlockModal';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux';
import { removeCourseBlock, setBlocksInfo, setBlocksInfoErrors, setErrors } from '@modules/courses/redux/slice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { t } from 'i18next';
import { COURSE_VALIDATION } from '@modules/courses/constants/validation';
import Input from '@components/ui/Input/Input';
import { BuilderContext } from '@modules/courses/context/BuilderContext';
import { BUILDER_IMAGES_KEY } from '@modules/courses/constants/builder';
import styles from './CourseBlockForm.module.scss';

type Props = {
  items: string[],
  id: string,
  isOverMe: boolean,
};

interface BlockForm {
  title: string,
}

const courseBlockSchema = yup.object({
  title: yup.string()
    .optional()
    .max(COURSE_VALIDATION.maxBlockTitle, t('auth.maxLength', { value: COURSE_VALIDATION.maxBlockTitle })),
});

const CourseBlockForm: React.FC<Props> = ({ items, id, isOverMe }) => {
  const blocksInfo = useAppSelector((state) => state.courseBuilder.blocksInfo);
  const blocks = useAppSelector((state) => state.courseBuilder.blocks);
  const validationTrigger = useAppSelector((state) => state.courseBuilder.validationTrigger);
  const index = useMemo(() => {
    return Object.keys(blocksInfo).findIndex((item) => item === id) || 0;
  }, [blocksInfo]);
  const { iDb, setFiles } = useContext(BuilderContext);
  const {
    trigger,
    setValue,
    formState: { errors, isDirty },
  } = useForm<BlockForm>({
    mode: 'all',
    defaultValues: {
      title: blocksInfo[id]?.title || '',
    },
    resolver: yupResolver(courseBlockSchema),
  });
  const { setNodeRef, isOver } = useDroppable({
    id,
  });
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const isWithInitValues = useMemo(() => Boolean(blocksInfo[id]?.title.trim()), []);
  const isValidationTriggered = useRef(false);
  const previousValidationTrigger = useRef(validationTrigger);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    trigger()
      .then((result) => {
        dispatch(setBlocksInfoErrors({
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
          dispatch(setBlocksInfoErrors({
            id,
            result,
          }));
        });
      previousValidationTrigger.current = validationTrigger;
    }
  }, [validationTrigger]);
  
  const handleChangeBlockInfo = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setBlocksInfo({
      id,
      key: e.target.name,
      value: e.target.value,
    }));
    
    setValue('title', e.target.value, { shouldDirty: true });
    
    trigger(['title'])
      .then((result) => {
        dispatch(setBlocksInfoErrors({
          id,
          result,
        }));
      });
  };
  
  const handleOpenModal = () => {
    setDeleteOpen(true);
  };
  
  const handleCloseModal = () => {
    setDeleteOpen(false);
  };
  
  const handleDelete = () => {
    dispatch(removeCourseBlock(id));
    
    if (iDb) {
      const transaction = iDb.transaction(BUILDER_IMAGES_KEY, 'readwrite');
      const store = transaction.objectStore(BUILDER_IMAGES_KEY);
      const index = store.index('itemId');
      
      blocks[id].forEach((itemId) => {
        const deleteRequest = index.openCursor(IDBKeyRange.only(itemId));
        setFiles((prev) => prev.filter((item) => item.itemId === itemId));
        
        deleteRequest.onsuccess = (event: Event) => {
          const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
          if (cursor) {
            store.delete(cursor.primaryKey);
            cursor.continue();
          }
        };
      });
    }
  };
  
  return (
    <div className={styles.Block}>
      
      <Input
        name='title'
        value={blocksInfo[id]?.title}
        onChange={handleChangeBlockInfo}
        label={t('courses.blockTitle')}
        placeholder={t('courses.blockN', { value: index + 1 })}
        error={isDirty || isWithInitValues || isValidationTriggered.current ? errors?.title?.message : ''}
        isInvalid={isDirty || isWithInitValues || isValidationTriggered.current ? Boolean(errors?.title?.message) : false}
      />
      
      <h4 className={styles.ContentTitle}>{t('core.content')}</h4>
      
      <div className={styles.Delete}>
        <Trash size={20} onClick={handleOpenModal}/>
      </div>
      
      {isDeleteOpen && (
        <Modal
          closeFunc={handleCloseModal}
          outsideHandler={handleCloseModal}
          withCloseIcon
        >
          <DeleteBlockModal
            onDelete={handleDelete}
            onClose={handleCloseModal}
          />
        </Modal>
      )}
      
      <div className={cn(
        styles.Content,
        items.length && styles.BlockContent,
        isOverMe && styles.BlockContentActive,
        isOverMe && styles.BlockContentOver,
      )}
      >
        <div className={cn(styles.OverBackground, isOverMe && styles.OverBackgroundActive)}/>
      
        <SortableContext
          id={id}
          items={items}
          strategy={verticalListSortingStrategy}
        >
          <div ref={setNodeRef}>
            {items.length ? (
              <div className={cn(styles.Container)}>
                {items.map((item) => (
                  <CourseBuilderItem key={item} id={item} containerId={id}/>
                ))}
              </div>
            ) : (
              <div className={cn(
                styles.EmptyContainer,
                isOverMe && styles.EmptyContainerActive,
                isOverMe && styles.EmptyContainerOver,
              )}
              >
                <ArrowsIn size={24} />
                <p className={styles.EmptyText}>{t('courses.selectAndDrop')}</p>
              </div>
            )}
          </div>
        </SortableContext>
        
      </div>
    </div>
  );
};

export default CourseBlockForm;
