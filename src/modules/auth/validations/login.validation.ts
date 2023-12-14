import * as yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(yup);

import { t } from 'i18next';

export const loginSchema = yup.object({
  login: yup.string()
    .required(t('errors.requiredFiled')),
  password: yup.string()
    .required(t('errors.requiredFiled')),
});
