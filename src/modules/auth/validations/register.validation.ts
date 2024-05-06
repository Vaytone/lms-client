import * as yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(yup);

import { t } from 'i18next';
import { REGISTER_VALIDATION } from '@modules/auth/constants/validation';
import { NAME_REGEX } from '@modules/auth/constants/regex';

export const registerSchema = yup.object({
  email: yup.string()
    .required(t('errors.requiredFiled'))
    .email(t('auth.enterValidEmail')),
  otp: yup.string()
    .min(REGISTER_VALIDATION.otpLength)
    .max(REGISTER_VALIDATION.otpLength),
  password: yup.string()
    .password()
    .required(t('errors.requiredFiled'))
    .min(REGISTER_VALIDATION.minPassword, t('auth.minLength', { value: REGISTER_VALIDATION.minPassword }))
    .max(REGISTER_VALIDATION.maxPassword, t('auth.maxLength', { value: REGISTER_VALIDATION.maxPassword }))
    .minLowercase(0)
    .minNumbers(REGISTER_VALIDATION.minNumbers, t('auth.minNumbers', { value: REGISTER_VALIDATION.minNumbers }))
    .minSymbols(0)
    .minUppercase(REGISTER_VALIDATION.minUppercase, t('auth.minUpperCase', { value: REGISTER_VALIDATION.minUppercase })),
  confirmPassword: yup.string()
    .required(t('errors.requiredFiled'))
    .oneOf([yup.ref('password'), null], t('auth.passwordDontMatch')),
  firstName: yup.string()
    .required(t('errors.requiredFiled'))
    .matches(NAME_REGEX, t('auth.invalidValue'))
    .min(REGISTER_VALIDATION.minFirstName, t('auth.minLength', { value: REGISTER_VALIDATION.minLastName }))
    .max(REGISTER_VALIDATION.maxFirstName, t('auth.maxLength', { value: REGISTER_VALIDATION.maxLastName })),
  lastName: yup.string()
    .required(t('errors.requiredFiled'))
    .matches(NAME_REGEX, t('auth.invalidValue'))
    .min(REGISTER_VALIDATION.minFirstName, t('auth.minLength', { value: REGISTER_VALIDATION.minFirstName }))
    .max(REGISTER_VALIDATION.maxLastName, t('auth.maxLength', { value: REGISTER_VALIDATION.maxLastName })),
  avatar: yup.mixed(),
  greetingMessage: yup.string()
    .max(REGISTER_VALIDATION.maxMessage, t('auth.maxLength', { value: REGISTER_VALIDATION.maxMessage })),
});
