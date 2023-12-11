import { RoleEnum } from '@type/role.types';

export interface User {
  id: number;
  firsName: string;
  lastName: string;
  login: string;
  active: boolean;
  closed: boolean;
  role: RoleEnum
}
