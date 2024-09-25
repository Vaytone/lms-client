import React, { memo, useContext, useMemo, useState } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Task from '@modules/courses/components/Task/Task';
import { useDroppable } from '@dnd-kit/core';
import cn from 'classnames';
import { BuilderContext } from '@modules/courses/contexts/BuilderContext';
import TextArea from '@components/ui/TextArea/Input';
import { useTranslation } from 'react-i18next';
import Input from '@components/ui/Input/Input';
import { Trash, TrashSimple } from '@phosphor-icons/react';
import Modal from '@components/Modal/Modal';
import DeleteBlockModal from '@modules/courses/components/DeleteBlockModal/DeleteBlockModal';
import styles from './Column.module.scss';

type Props = {
  items: any[]
  id: string,
  activeId: string | null,
  isOverMe: boolean,
}

const Column: React.FC<Props> = ({ items, id, activeId, isOverMe }) => {
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const { blocksData, removeBlock, handleChangeBlockData } = useContext(BuilderContext);
  const blockInfo = useMemo(() => {
    const obj = blocksData.find((item) => item.id === id);
    const indx = blocksData.findIndex((item) => item.id === id);
    
    return {
      title: obj.title,
      indx,
    };
  }, [blocksData]);
  const { setNodeRef } = useDroppable({
    id,
  });
  const { t } = useTranslation();
  
  const handleOpenModal = () => {
    setDeleteOpen(true);
  };
  
  const handleCloseModal = () => {
    setDeleteOpen(false);
  };
  
  const handleDelete = () => {
    removeBlock(id);
    handleCloseModal();
  };
  
  const handleChangeBlockInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeBlockData(id, e.target.name, e.target.value);
  };
  
  return (
    <div className={styles.Column}>
      <Input
        name='title'
        value={blockInfo.title}
        onChange={handleChangeBlockInfo}
        label={t('courses.blockTitle')}
        placeholder={t('courses.blockN', { value: blockInfo.indx + 1 })}
        // isInvalid={Boolean(errors.description)}
        // error={errors?.description?.message}
      />
      
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
      
      <h4 className={styles.ContentTitle}>Контент</h4>
      
      <div className={styles.Delete}>
        <Trash size={20} onClick={handleOpenModal}/>
      </div>
      
      <div className={styles.Content}>
        
        <SortableContext
          id={id}
          items={items}
          strategy={verticalListSortingStrategy}
        >
          <div ref={setNodeRef}>
            {items.length ? (
              <div className={styles.Wrapper}>
                <div className={cn(styles.Container, isOverMe && styles.ContainerIsOver)}>
                  {items.map((item) => (
                    <Task isActive={activeId === item.id} key={item.id} item={item}/>
                  ))}
                </div>
                
                {isOverMe && (
                  <div className={styles.ContainerOver}>
                    <span className='icon-drag'/>
                    <p>Drop here</p>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <p>перенесите блок сюда</p>
              </div>
            )}
          </div>
        </SortableContext>
      </div>
    </div>
  );
};

export default memo(Column);
