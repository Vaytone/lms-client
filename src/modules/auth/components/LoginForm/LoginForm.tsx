import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Input from '@components/ui/Input/Input';
import Button from '@components/ui/Button/Button';
import { SignInForm } from '@modules/auth/types/auth.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@modules/auth/validations/login.validation';
import { login } from '@modules/auth/redux/thunks';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux';
import { useTranslation } from 'react-i18next';
import styles from './LoginForm.module.scss';

const LoginForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<SignInForm>({
    mode: 'all',
    defaultValues: {
      login: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  
  const handleSubmitEvent: SubmitHandler<SignInForm> = (data, event) => {
    event.preventDefault();
    dispatch(login(data));
  };
  
  return (
    <div className={styles.LoginFormWrapper}>
      <div className={styles.LoginContentWrapper}>
        <h2>{t('auth.signIn')}</h2>
        <form onSubmit={handleSubmit(handleSubmitEvent)}>
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
          <div className="mb-32">
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
                />
              )}
            />
          </div>
          <Button
            text={t('auth.signIn')}
            type="submit"
            disabled={Boolean(Object.keys(errors).length) || !isDirty || isLoading}
          />
        </form>
        <p className={styles.LoginText}>{t('auth.loginText')}</p>
      </div>
    </div>
  );
};

export default LoginForm;
