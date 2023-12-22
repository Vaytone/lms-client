import { getNotification } from '@shared/helper/notification';
import { NotificationTypeEnum } from '@type/notification.types';
import { baseErrorManager } from '@shared/helper/errorManager';
import { t } from 'i18next';
import { MemberErrorsEnum } from '@modules/members/types/error.types';

export function membersErrorManager(message: string): void {
  const baseErrorManagerResult = baseErrorManager(message);
  
  if (!baseErrorManagerResult) {
    switch (message) {
    case MemberErrorsEnum.ApplicationNotExist:
      getNotification(t('members.applicationNotExist'), NotificationTypeEnum.error);
      break;
    default:
      getNotification(t('error.somethingWentWrong'), NotificationTypeEnum.error);
      break;
    }
  }
}
