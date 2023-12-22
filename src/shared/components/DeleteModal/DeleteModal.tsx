import React from 'react';
import Button from '@components/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { DeleteModalProps } from '@components/DeleteModal/types';
import styles from './DeleteModal.module.scss';

const DeleteModal: React.FC<DeleteModalProps> = ({ onClose, text, title, onDelete }) => {
  const { t } = useTranslation();
  
  const onDeleteHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onDelete();
    onClose();
  };
  
  return (
    <div className={styles.ModalWrapper}>
      <h3 className={styles.ModalTitle}>{title}</h3>
      <p className={styles.ModalText}>{text}</p>
      <div className={styles.ModalButtons}>
        <Button
          text={t('core.confirm')}
          onClick={onDeleteHandler}
          isDanger
        />
        <Button
          text={t('core.cancel')}
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default DeleteModal;
