import { SignUpForm } from '@modules/auth/types/auth.types';

export function getSignUpFormData(values: SignUpForm, code: string): FormData {
  const formData = new FormData();
  
  if (values.avatar) {
    formData.append('avatar', values.avatar);
  }
  formData.append('code', code);
  
  Object.keys(values).forEach((item) => {
    if (item !== 'avatar') {
      formData.append(item, values[item as keyof SignUpForm]);
    }
  });
  
  return formData;
}
