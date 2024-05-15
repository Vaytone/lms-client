import { RoleEnum } from '@type/role.types';
import { UserStatus } from '@type/user.types';

export interface UserApplication {
  id: number,
  avatar: string | null,
  first_name: string,
  last_name: string,
  full_name: string,
  email: string,
  user_info: {
    role: RoleEnum,
  },
  user_statuses: {
    status: UserStatus,
  },
  created_at: Date,
  message: null | {
    text: string
  }
}

export enum ApplicationSortBy {
  Name = 'name',
  Email = 'email',
  Date = 'date',
}
