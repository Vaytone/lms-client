import * as yup from 'yup';

import { t } from 'i18next';

export const createGroupSchema = yup.object({
  name: yup.string()
    .required(t('errors.requiredFiled')),
  description: yup.string().optional(),
});
