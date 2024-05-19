import { RoleEnum } from '@type/role.types';

export const ROLES_OPTIONS = [{ value: RoleEnum.Admin, label: 'core.admin' }, { value: RoleEnum.Student, label: 'core.student' }, { value: RoleEnum.Watcher, label: 'core.watcher' }, { value: 'all', label: 'core.allRoles' }];
export const SORT_OPTIONS = [{ value: 'full_name', label: 'applications.name' }, { value: 'email', label: 'applications.email' }, { value: 'created_at', label: 'applications.date' }];
