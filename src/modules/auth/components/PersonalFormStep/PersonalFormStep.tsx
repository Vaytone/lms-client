import React from 'react';
import { PersonalFormStepProps } from '@modules/auth/components/PersonalFormStep/types';
import { Controller } from 'react-hook-form';
import Input from '@components/ui/Input/Input';
import Button from '@components/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { RegisterStepEnum } from '@modules/auth/types/auth.types';
import styles from './PersonalFormStep.module.scss';

const PersonalFormStep: React.FC<PersonalFormStepProps> = ({ setStep, errors, trigger, control }) => {
  const { t } = useTranslation();
  
  const handleNext = () => {
    trigger(['firstName', 'lastName'])
      .then((validationResult) => {
        if (validationResult) {
          setStep(RegisterStepEnum.Avatar);
        }
      });
  };
  
  const handleBack = () => {
    setStep(RegisterStepEnum.Account);
  };
  
  return (
    <div className={styles.PersonalStepWrapper}>
      <h3 className={styles.StepTitle}>{t('auth.personal')}</h3>
      <Controller
        name="firstName"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label={t('auth.name')}
            placeholder={t('auth.enterName')}
            isInvalid={Boolean(errors.firstName)}
            error={errors?.firstName?.message}
          />
        )}
      />
      <Controller
        name="lastName"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label={t('auth.surname')}
            placeholder={t('auth.enterSurname')}
            isInvalid={Boolean(errors.lastName)}
            error={errors?.lastName?.message}
          />
        )}
      />
      <div className={styles.ButtonWrapper}>
        <Button
          text={t('core.back')}
          onClick={handleBack}
          styleType='transparent'
        />
        <Button
          text={t('core.next')}
          onClick={handleNext}
          disabled={Boolean(errors.firstName) || Boolean(errors.lastName)}
        />
      </div>
    </div>
  );
};

export default PersonalFormStep;
