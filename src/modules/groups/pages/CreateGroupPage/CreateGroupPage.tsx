import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateGroupForm } from '@modules/groups/types/group.types';
import { createGroupSchema } from '@modules/groups/validations/createGroup.validation';
import Input from '@components/ui/Input/Input';
import { useTranslation } from 'react-i18next';
import Button from '@components/ui/Button/Button';
import styles from './CreateGroupPage.module.scss';
import TextArea from '@components/ui/TextArea/Input';
import BackButton from '@components/ui/BackButton/BackButton';

const CreateGroupPage: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<CreateGroupForm>({
    mode: 'all',
    defaultValues: {
      name: '',
      description: '',
    },
    resolver: yupResolver(createGroupSchema),
  });
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation();
  
  const handleSubmitEvent: SubmitHandler<CreateGroupForm> = (data, event) => {
    event.preventDefault();
  };
  
  return (
    <div className={styles.Page}>
      
      <div className={styles.FormWrapper}>
        <div className={styles.FormTitleWrapper}>
          <div className={styles.BackWrapper}>
            <BackButton/>
          </div>
          <h3 className={styles.FormTitle}>Створити групу</h3>
        </div>
        <form onSubmit={handleSubmit(handleSubmitEvent)} className={styles.Form}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={t('groups.name')}
                placeholder={t('groups.enterName')}
                isInvalid={Boolean(errors.name)}
                error={errors?.name?.message}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextArea
                {...field}
                label={t('auth.greetingMessage')}
                placeholder={t('auth.enterMessage')}
                isInvalid={Boolean(errors.description)}
                error={errors?.description?.message}
              />
            )}
          />
          <Button
            text={t('auth.signIn')}
            type="submit"
            disabled={Boolean(Object.keys(errors).length) || !isDirty || isLoading}
          />
        </form>
      </div>
    </div>
  );
};

export default CreateGroupPage;
