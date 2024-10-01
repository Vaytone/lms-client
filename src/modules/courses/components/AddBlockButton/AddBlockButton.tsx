import React, { useContext } from 'react';
import { StackPlus } from '@phosphor-icons/react';
import { BuilderContext } from '@modules/courses/contexts/BuilderContext';
import { useDroppable } from '@dnd-kit/core';
import { BuilderAreasEnum } from '@modules/courses/constants/builder';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import styles from './AddBlockButton.module.scss';

type Props = {
  isBuilderActive: boolean,
}

const AddBlockButton: React.FC<Props> = ({isBuilderActive}) => {
  const { t } = useTranslation();
  const { setNodeRef, isOver } = useDroppable({
    id: BuilderAreasEnum.AddButton,
  });
  const { addBlock } = useContext(BuilderContext);
  
  const handleAdd = () => {
    addBlock();
  };
  
  return (
    <div
      ref={setNodeRef}
      onClick={handleAdd}
      className={cn(styles.AddBlockButton, isBuilderActive ? styles.AddBlockButtonOver : null)}
    >
      <StackPlus size={24}/>
      
      <p>{isBuilderActive ? t('courses.createNewBlockWithElem') : 'Додати новий блок'}</p>
      
      {/*{isOver && (*/}
      {/*  <div className={styles.AddButtonOver}>*/}
      {/*    /!*<p>{t('courses.createNewBlockWithElem')}</p>*!/*/}
      {/*  </div>*/}
      {/*)}*/}
    
    </div>
  );
};

export default AddBlockButton;
