import { RoleEnum } from '@type/role.types';

export interface User {
  id: number;
	avatar: string,
  first_name: string;
  last_name: string;
  full_name: string;
  login: string;
  status: UserStatus,
  closed: boolean;
  role: RoleEnum;
  token: string;
	organisation: {
		name: string,
		short_name: string,
	}
}

export enum UserStatus {
  Pending = 'pending',
  Rejected = 'rejected',
  Active = 'active',
}
