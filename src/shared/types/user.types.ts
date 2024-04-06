import { RoleEnum } from '@type/role.types';

export interface User {
  id: number;
	avatar: string,
  firstName: string;
  lastName: string;
  login: string;
  active: boolean;
  closed: boolean;
  role: RoleEnum;
  token: string;
	organisation: {
		name: string,
		short_name: string,
	}
}
