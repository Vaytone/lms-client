import { getNotification } from '@shared/helper/notification';
import { NotificationTypeEnum } from '@type/notification.types';
import { baseErrorManager } from '@shared/helper/errorManager';
import { AuthErrorsEnum } from '@modules/auth/types/error.types';
import { t } from 'i18next';

export function authErrorManager(message: string): void {
  const baseErrorManagerResult = baseErrorManager(message);
  
  if (!baseErrorManagerResult) {
    switch (message) {
    case AuthErrorsEnum.UserAlreadyExist:
      getNotification(t('auth.userAlreadyExist'), NotificationTypeEnum.error);
      break;
    case AuthErrorsEnum.OrganisationIsInactive:
      getNotification(t('auth.organisationInactive'), NotificationTypeEnum.error);
      break;
    case AuthErrorsEnum.OrganisationNotFound:
      getNotification(t('auth.organisationNotFound'), NotificationTypeEnum.error);
      break;
    case AuthErrorsEnum.WrongLoginPassword:
      getNotification(t('auth.wrongLoginPassword'), NotificationTypeEnum.error);
      break;
    default:
      getNotification(t('error.somethingWentWrong'), NotificationTypeEnum.error);
      break;
    }
  }
}
