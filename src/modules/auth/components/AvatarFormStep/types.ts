import { Control, UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { RegisterStepEnum, SignUpForm } from '@modules/auth/types/auth.types';
import { PhotoState } from '@modules/auth/components/RegisterForm/types';
import React from 'react';

export interface AvatarFormStepProps {
  control: Control<SignUpForm>,
  setStep: (val: RegisterStepEnum) => void,
  setValue: UseFormSetValue<SignUpForm>,
  getValues: UseFormGetValues<SignUpForm>,
  setPhotoState: React.Dispatch<React.SetStateAction<PhotoState>>,
  photoState: PhotoState,
}
