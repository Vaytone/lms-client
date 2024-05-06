import { Control, FieldErrors, UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { RegisterStepEnum, SignUpForm } from '@modules/auth/types/auth.types';

export interface ConfirmFormStepProps {
  setStep: (val: RegisterStepEnum) => void,
  control: Control<SignUpForm>,
  isDirty: boolean,
  isLoading: boolean,
  errors: FieldErrors<SignUpForm>,
}
