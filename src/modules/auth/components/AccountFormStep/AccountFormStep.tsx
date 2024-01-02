import React from 'react';
import { AccountFormStepProps } from '@modules/auth/components/AccountFormStep/types';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Input from '@components/ui/Input/Input';
import { RegisterStepEnum } from '@modules/auth/types/auth.types';
import Button from '@components/ui/Button/Button';
import styles from './AccountFormStep.module.scss';

const AccountFormStep: React.FC<AccountFormStepProps> = ({ control, errors, setStep, trigger }) => {
  const { t } = useTranslation();
  
  const handleNext = () => {
    trigger(['login', 'confirmPassword', 'password'])
      .then((validationResult: boolean) => {
        if (validationResult) {
          setStep(RegisterStepEnum.Personal);
        }
      });
  };
  
  return (
    <div className={styles.AccountStepWrapper}>
      <h3 className={styles.StepTitle}>{t('auth.account')}</h3>
      <Controller
        name="login"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label={t('auth.login')}
            placeholder={t('auth.enterLogin')}
            isInvalid={Boolean(errors.login)}
            error={errors?.login?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label={t('auth.password')}
            placeholder={t('auth.enterPassword')}
            isInvalid={Boolean(errors.password)}
            error={errors?.password?.message}
            isSecure
          />
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label={t('auth.confirmPassword')}
            placeholder={t('auth.enterConfirmPassword')}
            isInvalid={Boolean(errors.confirmPassword)}
            error={errors?.confirmPassword?.message}
            isSecure
          />
        )}
      />
      <div className={styles.ButtonWrapper}>
        <Button
          text={t('core.next')}
          onClick={handleNext}
          disabled={Boolean(errors.login) || Boolean(errors.password) || Boolean(errors.confirmPassword)}
        />
      </div>
    </div>
  );
};

export default AccountFormStep;
