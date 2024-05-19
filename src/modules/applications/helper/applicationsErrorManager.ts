import { getNotification } from '@shared/helper/notification';
import { NotificationTypeEnum } from '@type/notification.types';
import { baseErrorManager } from '@shared/helper/errorManager';
import { t } from 'i18next';
import { ApplicationErrorEnum } from '@modules/applications/types/errors.types';

export function applicationsErrorManager(message: string): void {
  const baseErrorManagerResult = baseErrorManager(message);
  
  if (!baseErrorManagerResult) {
    console.log(message);
    switch (message) {
    case ApplicationErrorEnum.ApplicationNotFound:
      getNotification(t('applications.applicationNotFound'), NotificationTypeEnum.error);
      break;
    case ApplicationErrorEnum.StudentLimitExceeded:
      getNotification(t('applications.studentLimitExceeded'), NotificationTypeEnum.error);
      break;
    case ApplicationErrorEnum.AdminLimitExceeded:
      getNotification(t('applications.adminLimitExceeded'), NotificationTypeEnum.error);
      break;
    case ApplicationErrorEnum.WatcherLimitExceeded:
      getNotification(t('applications.watcherLimitExceeded'), NotificationTypeEnum.error);
      break;
    default:
      getNotification(t('error.somethingWentWrong'), NotificationTypeEnum.error);
      break;
    }
  }
}
