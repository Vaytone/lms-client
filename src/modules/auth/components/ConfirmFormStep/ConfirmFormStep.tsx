import React from 'react';
import { ConfirmFormStepProps } from '@modules/auth/components/ConfirmFormStep/types';
import { useTranslation } from 'react-i18next';
import Button from '@components/ui/Button/Button';
import { RegisterStepEnum } from '@modules/auth/types/auth.types';
import { Controller } from 'react-hook-form';
import TextArea from '@components/ui/TextArea/Input';
import BackButton from '@components/ui/BackButton/BackButton';
import styles from './ConfirmFormStep.module.scss';

const ConfirmFormStep: React.FC<ConfirmFormStepProps> = ({ setStep, errors, isLoading, isDirty, control }) => {
  const { t } = useTranslation();
  
  const handleBack = () => {
    setStep(RegisterStepEnum.Avatar);
  };
  
  return (
    <div style={{
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
    }}
    >
      <div style={{ height: '40px' }}>
        <BackButton onBack={handleBack}/>
      </div>
      <div className={styles.ConfirmStepWrapper}>
        <h3 className={styles.StepTitle}>{t('auth.confirmTitle')}</h3>
        <p className={styles.StepDescription}>
          {t('auth.confirmDescription')}
        </p>
        <div className={styles.ConfirmInfoWrapper}>
          <Controller
            name="greetingMessage"
            control={control}
            render={({ field }) => (
              <TextArea
                {...field}
                label={t('auth.greetingMessage')}
                placeholder={t('auth.enterMessage')}
                isInvalid={Boolean(errors.lastName)}
                error={errors?.lastName?.message}
              />
            )}
          />
        </div>
        
        <div className={styles.ButtonWrapper}>
          <Button
            text={t('auth.createAccount')}
            type='submit'
            disabled={Boolean(Object.keys(errors).length) || !isDirty || isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmFormStep;
