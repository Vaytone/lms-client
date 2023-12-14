import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { SignUpForm } from '@modules/auth/types/auth.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '@modules/auth/validations/register.validation';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux';
import Input from '@components/ui/Input/Input';
import Button from '@components/ui/Button/Button';
import { register } from '@modules/auth/redux/thunks';
import { useTranslation } from 'react-i18next';
import RoleTag from '@components/RoleTag/RoleTag';
import RegisterBanner from '@modules/auth/components/RegisterBanner/RegisterBanner';
import { RegisterFormProps } from '@modules/auth/components/RegisterForm/types';
import styles from './RegisterForm.module.scss';
import { authErrorManager } from '@modules/auth/helper/authErrorManager';
import { useNavigate } from 'react-router-dom';

const RegisterForm: React.FC<RegisterFormProps> = ({ code }) => {
  const registerData = useAppSelector((state) => state.auth.registration_data);
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<SignUpForm>({
    mode: 'all',
    defaultValues: {
      login: '',
      password: '',
      lastName: '',
      firstName: '',
      confirmPassword: '',
    },
    resolver: yupResolver(registerSchema),
  });
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
      <RegisterBanner role={registerData.role}/>
      <div className={styles.RegisterContentWrapper}>
        <div className={styles.RegisterTitleWrapper}>
          <h2>{t('auth.signUp')}</h2>
          <RoleTag role={registerData.role}/>
        </div>
        <h3 className={styles.RegisterOrganisationName}>{registerData.organisation_name}</h3>
        <form onSubmit={handleSubmit(handleSubmitEvent)}>
          <div className="mb-16">
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
          </div>
          <div className="mb-16">
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
          </div>
          <div className="mb-16">
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
          </div>
          <div className="mb-16">
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
          </div>
          <div className="mb-32">
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
          </div>
          <Button
            text={t('auth.signUp')}
            type="submit"
            disabled={Boolean(Object.keys(errors).length) || !isDirty || isLoading}
          />
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
