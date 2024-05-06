import { RoleEnum } from '@type/role.types';

export interface UserApplication {
  id: number,
  avatar: string | null,
  first_name: string,
  last_name: string,
  login: string,
  role: RoleEnum,
  created_at: Date,
}
