import * as yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(yup);

import { t } from 'i18next';
import { REGISTER_VALIDATION } from '@modules/auth/constants/validation';
import { LOGIN_REGEX, NAME_REGEX } from '@modules/auth/constants/regex';

export const registerSchema = yup.object({
  login: yup.string()
    .required(t('errors.requiredFiled'))
    .matches(LOGIN_REGEX, t('auth.invalidValue'))
    .min(REGISTER_VALIDATION.minLogin, t('auth.minLength', { value: REGISTER_VALIDATION.minLogin }))
    .max(REGISTER_VALIDATION.maxLogin, t('auth.maxLength', { value: REGISTER_VALIDATION.maxLogin })),
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
});
