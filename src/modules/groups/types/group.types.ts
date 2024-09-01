import { GroupRoleEnum } from '@type/role.types';

export interface CreateGroupForm {
  name: string,
  mentor: number | null,
}

export interface AddStudentForm {
  ids: number[],
}

export interface UserGroup {
  role: GroupRoleEnum,
  user: {
    avatar: string | null,
    id: number,
    full_name: string,
    first_name: string,
  }
}

export interface Group {
  name: string,
  id: number,
  users: UserGroup[],
  created_at: string,
}
