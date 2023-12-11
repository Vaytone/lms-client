import { User } from '@type/user.types';

export interface AuthState {
  isLinkValid: boolean;
  isLoading: boolean,
  user: User | null,
}
