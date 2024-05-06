import { User } from '@type/user.types';
import { RoleEnum } from '@type/role.types';

export interface AuthState {
  isLinkValid: boolean,
  isLinkLoading: boolean,
  isLoading: boolean,
  user: User | null,
  registration_data: {
    organisation_name: string
    role: RoleEnum,
  } | null,
}

export interface SignInForm {
  email: string,
  password: string,
}

export interface SignUpForm {
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  otp: string,
  confirmPassword: string,
  greetingMessage: string,
  avatar: File | '',
}

export interface ValidateLinkResponse {
  role: RoleEnum,
  organisation_name: string,
}

export enum RegisterStepEnum {
  EmailVerification = 'email',
  Account = 'account',
  Avatar = 'avatar',
  Personal = 'personal',
  Confirm = 'confirm',
}
