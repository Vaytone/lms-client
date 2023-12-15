import { getNotification } from '@shared/helper/notification';
import { NotificationTypeEnum } from '@type/notification.types';
import { BaseErrorEnum } from '@type/error.types';
import { t } from 'i18next';

export function baseErrorManager(message: string): boolean {
  switch (message) {
  case BaseErrorEnum.NoAccess:
    getNotification(t('error.noAccess'), NotificationTypeEnum.error);
    return true;
  default:
    return false;
  }
}
