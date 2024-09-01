import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { CreateGroupForm } from '@modules/groups/types/group.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { createGroupSchema } from '@modules/groups/validations/createGroup.validation';
import { useTranslation } from 'react-i18next';
import Input from '@components/ui/Input/Input';
import Button from '@components/ui/Button/Button';
import UserSearchSelect from '@components/ui/UserSearchSelect/UserSearchSelect';
import { useGetOrganisationAdminsQuery } from '@shared/redux/organisation/api';
import { useCreateGroupMutation } from '@modules/groups/redux/api';
import cn from 'classnames';
import styles from './CreateGroupModal.module.scss';

type Props = {
  closeFunc: () => void,
}

const CreateGroupModal: React.FC<Props> = ({ closeFunc }) => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, isDirty },
  } = useForm<CreateGroupForm>({
    mode: 'all',
    defaultValues: {
      name: '',
      mentor: null,
    },
    resolver: yupResolver(createGroupSchema),
  });
  const { data = [], isLoading } = useGetOrganisationAdminsQuery();
  const [createGroup, { isSuccess, isLoading: isCreateLoading }] = useCreateGroupMutation();
  const [createSuccess, setCreateSuccess] = useState(false);
  const { t } = useTranslation();

  const handleSubmitEvent: SubmitHandler<CreateGroupForm> = (data, event) => {
    event.preventDefault();
    createGroup({ values: data });
  };
  
  useEffect(() => {
    if (isSuccess) {
      setCreateSuccess(true);
    }
  }, [isSuccess]);
  
  return (
    <div className={styles.ModalWrapper}>
      
      {createSuccess ? (
        <>
          <div className={styles.SuccessWrapper}>
            <div className={styles.IconWrapper}>
              <span className={cn('icon-check', styles.Icon)}/>
            </div>
            <p className={styles.SuccessText}>{t('groups.created', { name: `"${getValues('name')}"` })}</p>
          </div>
          
          <div className={styles.ButtonWrapper}>
            <Button
              text={t('core.close')}
              onClick={closeFunc}
            />
          </div>
        </>
      ) : (
        <>
          <div className={styles.TitleWrapper}>
            <h3 className={styles.Title}>{t('groups.createGroup')}</h3>
            <p className={styles.Description}>{t('groups.createDescription')}</p>
          </div>
          <div className={styles.Divider}/>
          
          <form onSubmit={handleSubmit(handleSubmitEvent)} className={styles.Form}>
            <div className={styles.FormContent}>
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
                name="mentor"
                control={control}
                render={({ field }) => (
                  <UserSearchSelect
                    options={data}
                    selected={field.value}
                    onChange={field.onChange}
                    label={t('groups.mentorLabel')}
                    placeholder={t('groups.selectMentor')}
                    isLoading={isLoading}
                    isInvalid={Boolean(errors?.mentor)}
                    error={errors?.mentor?.message}
                  />
                )}
              />
            
            </div>
            <Button
              text={t('core.create')}
              type="submit"
              disabled={Boolean(Object.keys(errors).length) || !isDirty || isCreateLoading}
            />
          </form>
        </>
      )}
    
    </div>
  );
};

export default CreateGroupModal;
