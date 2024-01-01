import { SignUpForm } from '@modules/auth/types/auth.types';

export function getSignUpFormData(values: SignUpForm, code: string): FormData {
  const formData = new FormData();
  
  formData.append('avatar', values.avatar);
  formData.append('code', code);
  
  Object.keys(values).forEach((item) => {
    if (item !== 'avatar') {
      formData.append(item, values[item as keyof SignUpForm]);
    }
  });
  
  return formData;
}
