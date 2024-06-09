import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';
import Input from '@components/ui/Input/Input';
import Button from '@components/ui/Button/Button';
import { EmailVerificationStepProps } from '@modules/auth/components/EmailVerificationStep/types';
import { useAppDispatch } from '@shared/hooks/redux';
import { verifyEmail } from '@modules/auth/redux/thunks';
import { authErrorManager } from '@modules/auth/helper/authErrorManager';
import OTPSubStep from '@modules/auth/components/OTPSubStep/OTPSubStep';
import BackButton from '@components/ui/BackButton/BackButton';
import styles from './EmailVerificationStep.module.scss';

const EmailVerificationStep: React.FC<EmailVerificationStepProps> = ({
  setStep,
  trigger,
  control,
  errors,
  code,
  getValues,
  dirtyFields,
}) => {
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [isOTPSent, setIsOTPSent] = useState(false);
  const dispatch = useAppDispatch();
  const handleNext = () => {
    trigger(['email'])
      .then((validationResult) => {
        if (validationResult) {
          setLoading(true);
          dispatch(verifyEmail({ code, email: getValues().email }))
            .unwrap()
            .then(() => {
              setIsOTPSent(true);
            })
            .catch((e) => {
              authErrorManager(e);
            })
            .finally(() => {
              setLoading(false);
            });
        }
      });
  };
  
  const handleBack = () => {
    setIsOTPSent(false);
  };
  
  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
      }}
    >
      <div style={{ height: '40px' }}>
        {isOTPSent && <BackButton onBack={handleBack}/>}
      </div>
      <div className={styles.EmailStepWrapper}>
        <h3 className={styles.StepTitle}>{t(!isOTPSent ? 'auth.emailVerification' : 'auth.confirmationCodeTitle')}</h3>
        <p className={styles.StepDescription}>
          {t(!isOTPSent ? 'auth.emailVerificationDescription' : 'auth.confirmationCodeDescription')}
        </p>
        {isOTPSent ? (
          <OTPSubStep
            control={control}
            errors={errors}
            setStep={setStep}
            trigger={trigger}
            getValues={getValues}
            code={code}
            dirtyFields={dirtyFields}
          />
        ) : (
          <>
            <div className={styles.StepInputs}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label={t('auth.email')}
                    placeholder={t('auth.enterEmail')}
                    isInvalid={Boolean(errors.email)}
                    error={errors?.email?.message}
                  />
                )}
              />
            </div>
            <div className={styles.ButtonWrapper}>
              <Button
                text={t('core.next')}
                onClick={handleNext}
                disabled={Boolean(errors.email) || isLoading}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailVerificationStep;
