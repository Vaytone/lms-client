import { getNotification } from '@shared/helper/notification';
import { NotificationTypeEnum } from '@type/notification.types';
import { baseErrorManager } from '@shared/helper/errorManager';
import { AuthErrorsEnum } from '@modules/auth/types/error.types';

export function authErrorManager(message: string): void {
  const baseErrorManagerResult = baseErrorManager(message);
  
  if (!baseErrorManagerResult) {
    switch (message) {
    case AuthErrorsEnum.UserAlreadyExist:
      getNotification('auth.userAlreadyExist', NotificationTypeEnum.error);
      break;
    case AuthErrorsEnum.OrganisationIsInactive:
      getNotification('auth.organisationInactive', NotificationTypeEnum.error);
      break;
    case AuthErrorsEnum.OrganisationNotFound:
      getNotification('auth.organisationNotFound', NotificationTypeEnum.error);
      break;
    case AuthErrorsEnum.WrongLoginPassword:
      getNotification('auth.wrongLoginPassword', NotificationTypeEnum.error);
      break;
    default:
      getNotification('error.somethingWentWrong', NotificationTypeEnum.error);
      break;
    }
  }
}
