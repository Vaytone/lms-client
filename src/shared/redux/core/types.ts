import { PageEnum } from '@type/page.types';
import { Languages } from '@type/core.types';

export interface CoreState {
  isLoading: boolean,
  lng: Languages,
  currentPage: PageEnum,
  theme: 'light' | 'dark',
}
