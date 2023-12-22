import { RoleEnum } from '@type/role.types';

export interface ApplicationsState {
  data: UserApplication[],
  selected: number[],
  page: number,
  isLoading: true,
}

export interface UserApplication {
  id: number,
  first_name: string,
  last_name: string,
  login: string,
  role: RoleEnum,
  created_at: Date,
}
