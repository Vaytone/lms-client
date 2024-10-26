import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@components/ui/Button/Button';
import styles from './DeleteBlockModal.module.scss';

type Props = {
  onDelete: () => void,
  onClose: () => void,
}

const DeleteBlockModal: React.FC<Props> = ({ onDelete, onClose }) => {
  const { t } = useTranslation();
  
  return (
    <div className={styles.Wrapper}>
      <h5 className={styles.Title}>{t('core.areYouSure')}</h5>
      <p className={styles.Description}>
        {t('courses.deleteAlert')}
      </p>
      <div className={styles.Buttons}>
        <Button text={t('core.cancel')} styleType='bordered' onClick={onClose}/>
        <Button text={t('core.delete')} styleType='danger' onClick={onDelete}/>
      </div>
    </div>
  );
};

export default DeleteBlockModal;
