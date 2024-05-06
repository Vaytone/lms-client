import React, { useEffect, useState } from 'react';
import styles from '@modules/auth/components/EmailVerificationStep/EmailVerificationStep.module.scss';
import { Controller } from 'react-hook-form';
import Input from '@components/ui/Input/Input';
import cn from 'classnames';
import { OTPSubStepProps } from '@modules/auth/components/OTPSubStep/types';
import { verifyEmail, verifyOTP } from '@modules/auth/redux/thunks';
import { RegisterStepEnum } from '@modules/auth/types/auth.types';
import { authErrorManager } from '@modules/auth/helper/authErrorManager';
import { useAppDispatch } from '@shared/hooks/redux';
import Button from '@components/ui/Button/Button';
import { getNotification } from '@shared/helper/notification';
import { useTranslation } from 'react-i18next';

const OTPSubStep: React.FC<OTPSubStepProps> = ({ setStep, control, errors, code, getValues, trigger, dirtyFields }) => {
  const [isLoading, setLoading] = useState(false);
  const [timer, setTimer] = useState(120);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [timer]);
  
  const handleNext = () => {
    trigger(['otp'])
      .then((validationResult) => {
        if (validationResult) {
          setLoading(true);
          dispatch(verifyOTP({ code, email: getValues().email, otp: getValues().otp }))
            .unwrap()
            .then((res: {message: string}) => {
              if (res.message === 'Success') {
                setStep(RegisterStepEnum.Account);
              }
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
  
  const handleResendClick = () => {
    setTimer(120);
    dispatch(verifyEmail({ code, email: getValues().email }))
      .unwrap()
      .then(() => {
        getNotification('Verification code resend');
      })
      .catch((e) => {
        authErrorManager(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  return (
    <>
      <div className={styles.StepInputs}>
        <Controller
          name="otp"
          control={control}
          render={({ field }) => {
            return (
              <Input
                {...field}
                label={t('auth.otpLabel')}
                withoutError
                placeholder={t('auth.enterOTP')}
              />
            );
          }}
        />
        {timer > 0 ? (
          <span
            className={styles.ResendButton}
          >
            {`${t('auth.resend')} ${Math.floor(timer / 60)}:${timer % 60 < 10 ? `0${timer % 60}` : timer % 60}`}
          </span>
        ) : <span className={cn(styles.ResendButton, styles.ResendButtonActive)} onClick={handleResendClick}>Resend</span>}
      </div>
      <div className={styles.ButtonWrapper}>
        <Button
          text={t('core.next')}
          onClick={handleNext}
          disabled={Boolean(errors.otp) || isLoading || !dirtyFields.otp}
        />
      </div>
    </>
  );
};

export default OTPSubStep;
