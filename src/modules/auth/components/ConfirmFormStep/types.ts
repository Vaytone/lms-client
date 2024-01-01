import { FieldErrors, UseFormGetValues } from 'react-hook-form';
import { RegisterStepEnum, SignUpForm } from '@modules/auth/types/auth.types';

export interface ConfirmFormStepProps {
  setStep: (val: RegisterStepEnum) => void,
  getValues: UseFormGetValues<SignUpForm>,
  isDirty: boolean,
  isLoading: boolean,
  errors: FieldErrors<SignUpForm>,
}
