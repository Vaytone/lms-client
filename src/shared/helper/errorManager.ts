import { getNotification } from '@shared/helper/notification';
import { NotificationTypeEnum } from '@type/notification.types';
import { BaseErrorEnum } from '@type/error.types';

export function baseErrorManager(message: string): boolean {
  switch (message) {
  case BaseErrorEnum.NoAccess:
    getNotification('error.noAccess', NotificationTypeEnum.error);
    return true;
  default:
    return false;
  }
}
