import { Control, FieldErrors, UseFormTrigger } from 'react-hook-form';
import { RegisterStepEnum, SignUpForm } from '@modules/auth/types/auth.types';

export interface PersonalFormStepProps {
  control: Control<SignUpForm>,
  errors: FieldErrors<SignUpForm>,
  setStep: (val: RegisterStepEnum) => void,
  trigger: UseFormTrigger<SignUpForm>,
}
