import React from 'react';
import { StackPlus } from '@phosphor-icons/react';
import { useDroppable } from '@dnd-kit/core';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import styles from './AddBlockButton.module.scss';

type Props = {
  addBlock: () => void,
}

const AddBlockButton: React.FC<Props> = ({ addBlock }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'addButton',
  });
  const { t } = useTranslation();
  
  const handleAdd = () => {
    addBlock();
  };
  
  return (
    <div
      ref={setNodeRef}
      onClick={handleAdd}
      className={cn(styles.AddBlockButton, isOver && styles.AddBlockButtonOver)}
    >
      <StackPlus size={24}/>

      <p>{isOver ? t('courses.createNewBlockWithElem') : t('courses.addNewBlock')}</p>
    </div>
  );
};

export default AddBlockButton;
