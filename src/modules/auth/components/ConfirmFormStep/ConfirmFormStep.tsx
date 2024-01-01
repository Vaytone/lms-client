import React from 'react';
import { ConfirmFormStepProps } from '@modules/auth/components/ConfirmFormStep/types';
import { useTranslation } from 'react-i18next';
import Button from '@components/ui/Button/Button';
import { RegisterStepEnum } from '@modules/auth/types/auth.types';
import AvatarFiller from '@components/ui/AvatarFillter/AvatarFiller';
import styles from './ConfirmFormStep.module.scss';

const ConfirmFormStep: React.FC<ConfirmFormStepProps> = ({ getValues, setStep, errors, isLoading, isDirty }) => {
  const values = getValues();
  const { t } = useTranslation();
  
  const handleBack = () => {
    setStep(RegisterStepEnum.Avatar);
  };
  
  return (
    <div className={styles.ConfirmStepWrapper}>
      <h3 className={styles.StepTitle}>{t('auth.confirm')}</h3>
      <div className={styles.ConfirmInfoWrapper}>
        {values.avatar ? <img className={styles.ConfirmAvatar} src={URL.createObjectURL(values.avatar as File)} alt='avatar'/> : (
          <div className={styles.ConfirmAvatarFiller}>
            <AvatarFiller text={values.firstName}/>
          </div>
        )}
        
        <div className={styles.ConfirmTextWrapper}>
          <h3>{`${values.firstName} ${values.lastName}`}</h3>
          <p>{values.login}</p>
        </div>
      </div>
      <div className={styles.ButtonWrapper}>
        <Button
          text={t('core.back')}
          onClick={handleBack}
          styleType='transparent'
        />
        <Button
          text={t('auth.createAccount')}
          type='submit'
          disabled={Boolean(Object.keys(errors).length) || !isDirty || isLoading}
        />
      </div>
    </div>
  );
};

export default ConfirmFormStep;
