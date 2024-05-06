import { Control, FieldErrors, UseFormGetValues, UseFormTrigger } from 'react-hook-form';
import { RegisterStepEnum, SignUpForm } from '@modules/auth/types/auth.types';

export interface EmailVerificationStepProps {
  control: Control<SignUpForm>,
  errors: FieldErrors<SignUpForm>,
  setStep: (val: RegisterStepEnum) => void,
  trigger: UseFormTrigger<SignUpForm>,
  getValues: UseFormGetValues<SignUpForm>,
  dirtyFields: Partial<UseFormGetValues<SignUpForm>>,
  code: string,
}
