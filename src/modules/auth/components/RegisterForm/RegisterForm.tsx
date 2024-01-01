import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RegisterStepEnum, SignUpForm } from '@modules/auth/types/auth.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '@modules/auth/validations/register.validation';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux';
import { register } from '@modules/auth/redux/thunks';
import { useTranslation } from 'react-i18next';
import { RegisterFormProps } from '@modules/auth/components/RegisterForm/types';
import { authErrorManager } from '@modules/auth/helper/authErrorManager';
import { useNavigate } from 'react-router-dom';
import RegisterProgressBar from '@modules/auth/components/RegisterProgressBar/RegisterProgressBar';
import AccountFormStep from '@modules/auth/components/AccountFormStep/AccountFormStep';
import PersonalFormStep from '@modules/auth/components/PersonalFormStep/PersonalFormStep';
import AvatarFormStep from '@modules/auth/components/AvatarFormStep/AvatarFormStep';
import ConfirmFormStep from '@modules/auth/components/ConfirmFormStep/ConfirmFormStep';
import styles from './RegisterForm.module.scss';

const RegisterForm: React.FC<RegisterFormProps> = ({ code }) => {
  const registerData = useAppSelector((state) => state.auth.registration_data);
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors, isDirty },
    setValue,
    getValues,
  } = useForm<SignUpForm>({
    mode: 'all',
    defaultValues: {
      login: '',
      password: '',
      lastName: '',
      firstName: '',
      confirmPassword: '',
      avatar: '',
    },
    resolver: yupResolver(registerSchema),
  });
  const [photoState, setPhotoState] = useState({
    photo: null,
    isEditOpen: false,
  });
  const [step, setStep] = useState<RegisterStepEnum>(RegisterStepEnum.Account);
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  
  const handleSubmitEvent: SubmitHandler<SignUpForm> = (data, event) => {
    event.preventDefault();
    dispatch(register({ code, values: data }))
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch((e) => {
        authErrorManager(e);
      });
  };

  return (
    <div className={styles.RegisterFormWrapper}>

      <div className={styles.RegisterContentWrapper}>
        <div className={styles.RegisterTitleWrapper}>
          <h2>{t('auth.signUp')}</h2>
        </div>
        <h3 className={styles.RegisterOrganisationName}>
          <span>{t(`core.${registerData.role}`)}</span>
          <span>{` ${t('auth.at')} ${registerData.organisation_name}`}</span>
        </h3>
        <RegisterProgressBar step={step}/>
        <form className={styles.RegisterFormElem} onSubmit={handleSubmit(handleSubmitEvent)}>
          {step === RegisterStepEnum.Account && (
            <AccountFormStep
              control={control}
              errors={errors}
              setStep={setStep}
              trigger={trigger}
            />
          )}
          {step === RegisterStepEnum.Personal && (
            <PersonalFormStep
              control={control}
              errors={errors}
              setStep={setStep}
              trigger={trigger}
            />
          )}
          {step === RegisterStepEnum.Avatar && (
            <AvatarFormStep
              control={control}
              setStep={setStep}
              setValue={setValue}
              getValues={getValues}
              photoState={photoState}
              setPhotoState={setPhotoState}
            />
          )}
          {step === RegisterStepEnum.Confirm && (
            <ConfirmFormStep
              getValues={getValues}
              setStep={setStep}
              isDirty={isDirty}
              errors={errors}
              isLoading={isLoading}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
