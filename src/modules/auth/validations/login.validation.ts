import * as yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(yup);

import { t } from 'i18next';

export const loginSchema = yup.object({
  email: yup.string()
    .required(t('errors.requiredFiled'))
    .email(t('auth.enterValidEmail')),
  password: yup.string()
    .required(t('errors.requiredFiled')),
});
