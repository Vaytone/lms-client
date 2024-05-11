import { RoleEnum } from '@type/role.types';

export interface UserApplication {
  id: number,
  avatar: string | null,
  first_name: string,
  last_name: string,
  email: string,
  role: RoleEnum,
  created_at: Date,
}

export enum ApplicationSortBy {
  Name = 'name',
  Email = 'email',
  Date = 'date',
}
